using System.Text.RegularExpressions;
using Angular_API.Data;
using Angular_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FoodController : ControllerBase
	{
		[HttpGet("foods")]
		public async Task<ActionResult> Seed()
		{
			var foodsCount = SampleData.Foods.Count;
			if (foodsCount > 0)
			{
				return Ok("foods is already exist!");
			}

			SampleData.Foods.AddRange(SampleData.Foods);
			return Ok("foods is done!");
		}

		[HttpGet]
		public ActionResult GetFoods()
		{
			var foods = SampleData.Foods;
			return Ok(foods);
		}

		[HttpGet("search/:{searchTerm}")]
		public ActionResult SearchFoods(string searchTerm)
		{
			var searchRegex = new Regex(searchTerm, RegexOptions.IgnoreCase);
			var foods = SampleData.Foods.Where(f => searchRegex.IsMatch(f.Name)).ToList();
			return Ok(foods);
		}

		[HttpGet("tags")]
		public ActionResult GetTags()
		{
			var tags = SampleData.Foods
				.SelectMany(f => f.Tags)
				.GroupBy(t => t)
				.Where(g => g.Count() > 3)
				.Select(g => new { Name = g.Key, Count = g.Count() })
				.OrderByDescending(g => g.Count)
				.ToList();

			var all = new { Name = "All", SampleData.Foods.Count };
			tags.Insert(0, all);

			return Ok(tags);
		}

		[HttpGet("tag/:{tagName}")]
		public ActionResult GetFoodsByTag(string tagName)
		{
			var foods = SampleData.Foods.Where(f => f.Tags.Contains(tagName)).ToList();
			return Ok(foods);
		}

		[HttpGet("{foodId}")]
		public ActionResult GetFood(int foodId)
		{
			var food = SampleData.Foods.FirstOrDefault(f => f.Id == foodId);
			if (food == null)
			{
				return NotFound();
			}

			return Ok(food);
		}

	}
}
