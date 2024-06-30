using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace Angular_API.Core.Entities
{
	public class Tag: BaseEntity
	{       
        public string Name { get; set; }
		public int count { get; set; }

		public List<Food> Foods { get; set; }
	}
}
