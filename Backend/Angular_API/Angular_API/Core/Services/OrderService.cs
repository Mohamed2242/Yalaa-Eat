using Angular_API.Core.Interfaces;
using Angular_API.Data;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Angular_API.Core.Services
{
	public class OrderService : IOrderService
	{
		private readonly IUnitOfWork _unitOfWork;

		public OrderService(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

		public async Task<Order> CreateOrderAsync(string buyerEmail, Order theOrder)
		{
			// get items from the product repo
			var items = new List<OrderItem>();
			if (theOrder.Id != null)
			{
				foreach (var item in theOrder.OrderItems)
				{
					var productItem = SampleData.Foods.FirstOrDefault(f => f.Id == item.ProductItemId);
					var orderItem = new OrderItem(productItem.Id, productItem.Name, productItem.ImageUrl, productItem.Price, item.Quantity);
					items.Add(orderItem);
				}
			}
			
			// calc subtotal
			var total = items.Sum(item => item.Price * item.Quantity);

			// create order
			var theNewOrder = new Order(items, buyerEmail, total, theOrder.PaymentIntentId);
			_unitOfWork.Repository<Order>().Add(theNewOrder);
			

			// save to db
			var result = await _unitOfWork.Complete();

			if (result <= 0) return null;

			// return order
			return theNewOrder;
		}

		public async Task<Order> UpdateOrderPaymentSucceeded(int orderId , string paymentIntentId)
		{
			var order = await _unitOfWork.Repository<Order>().GetByIdAsync(orderId);
			var spec = new OrdersWithItemsAndOrderingSpecification(order.Id);
			var finalOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

			if (finalOrder == null) return null;

			finalOrder.Status = OrderStatus.PaymentReceived;
			finalOrder.PaymentIntentId = paymentIntentId;
			_unitOfWork.Repository<Order>().Update(finalOrder);
			await _unitOfWork.Complete();

			return finalOrder;
		}

		public async Task<Order> GetLastOrder()
		{

			var orders = await _unitOfWork.Repository<Order>()
		.ListAsync(new OrdersWithItemsAndOrderingSpecification());

			return orders.LastOrDefault();
		}

		public async Task<Order> GetOrderByIdAsync(int id)
		{
			var spec = new OrdersWithItemsAndOrderingSpecification(id);
			var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
			return  order;
		}

		public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
		{
			var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);
			var orders = await _unitOfWork.Repository<Order>().ListAsync(spec);
			return orders;
		}
	}
}
