using System.Reflection;
using Angular_API.Core.Entities;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructue.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Food> Foods { get; set; }
		public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

		public DbSet<Angular_API.Models.User> Users { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
         
            modelBuilder.Entity<List<string>>()
		        .HasNoKey();

		}
    }
}