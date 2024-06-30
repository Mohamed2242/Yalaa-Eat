using System.ComponentModel.DataAnnotations;
using Core.Entities.OrderAggregate;

namespace Angular_API.Models
{
	public class User
	{
		public string GetEmail(string email)
		{
			Email = email;
			return Email;
		}
		[Key]
		public int Id { get; set; }
		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string Email { get; set; }

		public string Username { get; set; }

		public string Password { get; set; }

        public string Address { get; set; }

		public bool IsAdmin { get; set; }

        public string Token { get; set; }

		public string Role { get; set; }

		public string RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        public string ResetPasswordToken { get; set; }

        public DateTime ResetPasswordExpiry { get; set; }

		public List<Order> Orders { get; set; } = new List<Order>();
	}
}
