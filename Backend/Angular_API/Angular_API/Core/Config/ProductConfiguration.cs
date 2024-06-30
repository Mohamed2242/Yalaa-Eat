using System.Reflection.Emit;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Food>
    {
        public void Configure(EntityTypeBuilder<Food> builder)
        {
            builder.Property(f => f.Id).IsRequired();
            builder.Property(f => f.Name).IsRequired().HasMaxLength(100);
            builder.Property(f => f.Price).HasColumnType("decimal(18,2)");
            builder.Property(f => f.ImageUrl).IsRequired();
			builder.Property(f => f.Tags)
			 .HasConversion(
				v => string.Join(',', v),
				v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
			);
		}
    }
}