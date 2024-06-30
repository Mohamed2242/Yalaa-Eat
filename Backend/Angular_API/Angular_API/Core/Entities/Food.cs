using System.ComponentModel.DataAnnotations.Schema;
using Angular_API.Core.Entities;

namespace Core.Entities
{
    public class Food : BaseEntity
    {
		public string Name { get; set; }
		public decimal Price { get; set; }
		public bool Favorite { get; set; }
		public double Stars { get; set; }
		public string ImageUrl { get; set; }
		public string CookTime { get; set; }
		[NotMapped]
		public List<string> Tags { get; set; }
	}
}