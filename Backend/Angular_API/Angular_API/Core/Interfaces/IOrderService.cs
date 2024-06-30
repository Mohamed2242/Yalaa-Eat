
using Order = Core.Entities.OrderAggregate.Order;

namespace Angular_API.Core.Interfaces
{
	public interface IOrderService
	{
		Task<Order> CreateOrderAsync(string buyerEmail, Order order);
		Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
		Task<Order> GetLastOrder();
		Task<Order> GetOrderByIdAsync(int id);
		Task<Order> UpdateOrderPaymentSucceeded(int orderId, string paymentIntentId);

	}
}
