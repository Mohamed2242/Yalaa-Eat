using Angular_API.Core.Entities;

namespace Core.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(int productItemId, string productName, string pictureUrl, decimal price, int quantity)
        {
			ProductItemId = productItemId;
			ProductName = productName;
			PictureUrl = pictureUrl;
			Price = price;
            Quantity = quantity;
        }
		
		public int ProductItemId { get; set; }
		public string ProductName { get; set; }
		public string PictureUrl { get; set; }
		public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}