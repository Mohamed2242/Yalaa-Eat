namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
		public string Name { get; set; }
		public decimal Price { get; set; }
		public bool Favorite { get; set; }
		public double Stars { get; set; }
		public string ImageUrl { get; set; }
		public string CookTime { get; set; }
		public List<string> Tags { get; set; }
	}
}