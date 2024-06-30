using Core.Entities.OrderAggregate;

namespace API.Dtos
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
    }
}