using Angular_API.Core.Entities;

namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }
		public string GetEmail(string buyerEmail)
		{
            BuyerEmail = buyerEmail;
            return BuyerEmail;
		}
		public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, decimal totalprice, string paymentIntentId)
        {
            BuyerEmail = buyerEmail;     
            OrderItems = orderItems;
            TotalPrice = totalprice;
            PaymentIntentId = paymentIntentId;
        }

        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;        
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal TotalPrice { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }

        public decimal GetTotal()
        {
            return TotalPrice;
        }
    }
}