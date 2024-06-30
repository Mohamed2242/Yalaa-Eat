using System.Text;
using Angular_API.UtilityService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Angular_API.Core.Interfaces;
using Angular_API.Core.Services;
using Infrastructue.Data;
using Core.Interfaces;
using Infrastructure.Data;
using Stripe;
using Core.Entities;
using AutoMapper;
using API.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(option =>
{
	option.AddPolicy("MyPolicy", builder =>
	{
		builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
	});
});

builder.Services.AddDbContext<StoreContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("ConStr1")));
builder.Services.AddScoped<IGenericRepository<Food>, GenericRepository<Food>>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<IEmailService, EmailService>();
//builder.Services.AddScoped<IFood, FoodService>();

builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddAuthentication(x => 
{ 
	x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; 
	x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; 
}).AddJwtBearer(x => 
{ 
	x.RequireHttpsMetadata = false; 
	x.SaveToken = true; 
	x.TokenValidationParameters = new TokenValidationParameters
	{ 
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryverysecret.....")),
		ValidateAudience = false,
		ValidateIssuer = false
	};
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

//app.UseSession();

app.UseHttpsRedirection();

app.UseCors("MyPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
