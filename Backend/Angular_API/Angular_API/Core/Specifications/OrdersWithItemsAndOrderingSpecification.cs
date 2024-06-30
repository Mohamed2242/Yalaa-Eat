using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
		public OrdersWithItemsAndOrderingSpecification(int id) : base(o => o.Id == id)
		{
			AddInclude(o => o.OrderItems);
			AddOrderByDescending(o => o.OrderDate);
		}

		public OrdersWithItemsAndOrderingSpecification()
		: base(o => true)
		{
			AddInclude(o => o.OrderItems);
			AddOrderByDescending(o => o.OrderDate);
		}

		public OrdersWithItemsAndOrderingSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItemsAndOrderingSpecification(int id, string email)
            : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
        }
    }
}