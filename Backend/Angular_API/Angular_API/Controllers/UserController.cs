﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Angular_API.Helpers;
using Angular_API.Models;
using Angular_API.Models.Dto;
using Angular_API.UtilityService;
using Infrastructue.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Angular_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly StoreContext _authContext;
		private readonly IConfiguration _configuration;
		private readonly IEmailService _emailService;
		public UserController(StoreContext appDbContext, IConfiguration configuration, IEmailService emailService)
		{
			_authContext = appDbContext;
			_configuration = configuration;
			_emailService = emailService;
		}

		[HttpPost("login")]
		public async Task<IActionResult> Authenticate([FromBody] User userObj)
		{
			if (userObj == null)
				return BadRequest();

			var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username);

			if (user == null)
				return NotFound(new
				{
					Message = "User Not Found!"
				});

			if(!HashingPassword.VerifyPassword(userObj.Password, user.Password))
				return BadRequest(new
				{
					message = "Password is incorrect"
				});

			user.Token = CreateJwt(user);
			var newAccessToken = user.Token;
			var newRefreshToken = CreateRefreshToken();
			user.RefreshToken = newRefreshToken;
			user.RefreshTokenExpiryTime = DateTime.Now.AddHours(1);
			await _authContext.SaveChangesAsync();

			return Ok(new TokenApiDto()
			{
				AccessToken = newAccessToken,
				RefreshToken = newRefreshToken
			});
		}

		[HttpPost("register")]
		public async Task<IActionResult> RegisterUser([FromBody] User userObj)
		{
			if (userObj == null)
				return BadRequest();

			//Check if username exist
			if(await CheckUserNameExistAsync(userObj.Username))
				return BadRequest(new
				{
					Message = "Username Already Exist!"
				});


			//Check if Email exist
			if (await CheckEmailExistAsync(userObj.Email))
				return BadRequest(new
				{
					Message = "Email Already Exist!"
				});


			userObj.Password = HashingPassword.HashPassword(userObj.Password);

			userObj.Role = "User";
			userObj.Token = "";

			// Add the data to the database and save the changes
			await _authContext.Users.AddAsync(userObj);
			await _authContext.SaveChangesAsync();
			return Ok(new
			{
				Message = "Registered Successfully !"
			});
		}

		private Task<bool> CheckUserNameExistAsync(string username) => _authContext.Users.AnyAsync(x => x.Username == username);

		private Task<bool> CheckEmailExistAsync(string email) => _authContext.Users.AnyAsync(x => x.Email == email);

		private string CreateJwt(User user)
		{
			var jwtTokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes("veryverysecret.....");
			var identity = new ClaimsIdentity(new Claim[]
			{
				new Claim(ClaimTypes.Role, user.Role),
				new Claim(ClaimTypes.Email,user.Email),
				new Claim(ClaimTypes.Name,$"{user.Username}")
			});

			var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = identity,
				Expires = DateTime.Now.AddHours(1),
				SigningCredentials = credentials
			};
			var token = jwtTokenHandler.CreateToken(tokenDescriptor);
			return jwtTokenHandler.WriteToken(token);
		}

		private string CreateRefreshToken()
		{
			var tokenBytes = RandomNumberGenerator.GetBytes(64);
			var refreshToken = Convert.ToBase64String(tokenBytes);

			var tokenInUser = _authContext.Users
				.Any(a => a.RefreshToken == refreshToken);
			if (tokenInUser)
			{
				return CreateRefreshToken();
			}
			return refreshToken;
		}

		private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
		{
			var key = Encoding.ASCII.GetBytes("veryverysecret.....");
			var tokenValidationParameters = new TokenValidationParameters
			{
				ValidateAudience = false,
				ValidateIssuer = false,
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateLifetime = false
			};
			var tokenHandler = new JwtSecurityTokenHandler();
			SecurityToken securityToken;
			var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
			var jwtSecurityToken = securityToken as JwtSecurityToken;
			if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
				throw new SecurityTokenException("This is Invalid Token");
			return principal;

		}

		[Authorize]
		[HttpGet]
		public async Task<ActionResult<User>> GetAllUsers()
		{
			return Ok(await _authContext.Users.ToListAsync());
		}

		[HttpPost("refresh")]
		public async Task<IActionResult> Refresh([FromBody] TokenApiDto tokenApiDto)
		{
			if (tokenApiDto is null)
				return BadRequest("Invalid Client Request");
			string accessToken = tokenApiDto.AccessToken;
			string refreshToken = tokenApiDto.RefreshToken;
			var principal = GetPrincipleFromExpiredToken(accessToken);
			var username = principal.Identity.Name;
			var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Username == username);
			if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
				return BadRequest("Invalid Request");
			var newAccessToken = CreateJwt(user);
			var newRefreshToken = CreateRefreshToken();
			user.RefreshToken = newRefreshToken;
			await _authContext.SaveChangesAsync();
			return Ok(new TokenApiDto()
			{
				AccessToken = newAccessToken,
				RefreshToken = newRefreshToken,
			});
		}

		[HttpPost("send-reset-email/{email}")]
		public async Task<IActionResult> SendEmail(string email)
		{
			var user = await _authContext.Users.FirstOrDefaultAsync(a => a.Email == email);
			if (user is null)
			{
				return NotFound(new
				{
					StatusCode = 404,
					Message = "email Doesn't Exist"
				});
			}
			var tokenBytes = RandomNumberGenerator.GetBytes(64);
			var emailToken = Convert.ToBase64String(tokenBytes);
			user.ResetPasswordToken = emailToken;
			user.ResetPasswordExpiry = DateTime.Now.AddMinutes(10);
			string from = _configuration["EmailSettings:From"];
			var emailModel = new Email(email, "Reset Password!", EmailBody.EmailStringBody(email, emailToken));
			_emailService.SendEmail(emailModel);
			_authContext.Entry(user).State = EntityState.Modified;
			await _authContext.SaveChangesAsync();
			return Ok(new
			{
				StatusCode = 200,
				Message = "Email Sent!"
			});
		}

		[HttpPost("reset-password")]
		public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
		{
			var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
			var user = await _authContext.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
			if (user is null)
			{
				return NotFound(new
				{
					StatusCode = 404,
					Message = "email Doesn't Exist"
				});
			}
			var tokenCode = user.ResetPasswordToken;
			DateTime emailTokenExpiry = user.ResetPasswordExpiry;
			if(tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
			{
				return BadRequest(new
				{
					StatusCode = 400,
					Message = "Inavalid Reset link"
				});
			}
			user.Password = HashingPassword.HashPassword(resetPasswordDto.NewPassword);
			_authContext.Entry(user).State = EntityState.Modified;
			await _authContext.SaveChangesAsync();
			return Ok(new
			{
				StatusCode = 200,
				Message = "Password Reset Successfully"
			});
		}
	}
}
