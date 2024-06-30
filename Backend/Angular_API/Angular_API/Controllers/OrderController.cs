using Angular_API.Core.Interfaces;
using API.Dtos;
using AutoMapper;
using Infrastructue.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Order = Core.Entities.OrderAggregate.Order;

namespace Angular_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderService _orderService;
		private readonly IMapper _mapper;
		private readonly StoreContext _storeContext;
		public OrderController(IOrderService orderService, IMapper mapper, StoreContext storeContext)
		{
			_mapper = mapper;
			_orderService = orderService;
			_storeContext = storeContext;
		}

		[HttpPost("create")]
		public async Task<ActionResult<Order>> CreateOrder(Order newOrder)
		{			
			var user = await _storeContext.Users.FirstOrDefaultAsync(a => a.Email == newOrder.BuyerEmail);

			var order = await _orderService.CreateOrderAsync(user.Email, newOrder);

			if (order == null) return BadRequest("Problem creating order");

			user.Orders.Add(order);
			return Ok(order);
		}

		[HttpGet("newOrderForCurrentUser")]
		public async Task<Order> GetNewOrderForCurrentUser()
		{
			var order = await _orderService.GetLastOrder();
			var user = await _storeContext.Users.FirstOrDefaultAsync(a => a.Email == order.BuyerEmail);
			user.Orders.Add(order);

			return order;
		}

		[HttpGet("trackOrder/{id}")]
		public async Task<Order> GetOrderByIdForUser(int id)
		{
			var order = await _orderService.GetOrderByIdAsync(id);

			return order;
		}
		[HttpGet("{email}")]
		public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser(string email)
		{
			var orders = await _orderService.GetOrdersForUserAsync(email);

			return Ok(_mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders));
		}

		[HttpPost("pay")]
		public async Task<ActionResult<string>> PayOrder(Order theOrder)
		{
			var order = await _orderService.UpdateOrderPaymentSucceeded(theOrder.Id, theOrder.PaymentIntentId);
			return Ok(order.Id);
		}

		
	}
}
