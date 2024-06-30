
using Angular_API.Core.Entities;
using Core.Entities;

namespace Angular_API.Data
{
	public class SampleData
	{
		public static readonly List<Food> Foods = new List<Food>
		{
			new Food
			{
					Id = 1,
					Name = "Spicy Hamburger",
					CookTime = "10-15",
					Price = 8,
					Favorite = true,
					Stars = 4,
					ImageUrl = "../assets/foods/food-1.jfif",
					Tags = new List<string> { "Fast Food", "Hamburger", "Lunch" }
			},
			new Food
			{
				Id = 2,
				Name = "Hamburger",
				CookTime = "10-20",
				Price = 7,
				Favorite = false,
				Stars = 4.5,
				ImageUrl = "../assets/foods/food-2.jfif",
				Tags = new List<string> { "Fast Food", "Hamburger", "Lunch" }
			},
			new Food
			{
				Id = 3,
				Name = "(1/2)kg Shawerma",
				CookTime = "5-10",
				Price = 12,
				Favorite = true,
				Stars = 4.5,
				ImageUrl = "../assets/foods/food-3.jfif",
				Tags = new List<string> { "Slow Food", "Shawerma", "Lunch" }
			},
				new Food
				{
					Id = 4,
					Name = "(1/4)kg Chicken Drumsticks",
					CookTime = "10-20",
					Price = 10,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-5.jfif",
					Tags = new List<string> { "Chickens", "Lunch" }
				},
				new Food
				{
					Id = 5,
					Name = "(1/2)kg Fried Shrimps",
					CookTime = "20-30",
					Price = 15,
					Favorite = true,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-6.jfif",
					Tags = new List<string> { "Sea Food", "Shrimps", "Lunch", "Dinner" }
				},
				new Food
				{
					Id = 6,
					Name = "Pizza Pepperoni",
					CookTime = "15-25",
					Price = 12,
					Favorite = true,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-7.jfif",
					Tags = new List<string> { "Fast Food", "Pizza", "Lunch" }
				},
				new Food
				{
					Id = 7,
					Name = "Suger Donets",
					CookTime = "3-5",
					Price = 2,
					Favorite = true,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-8.jfif",
					Tags = new List<string> { "Deserts", "Donets", "Suger" }
				},
				new Food
				{
					Id = 8,
					Name = "(1/2)kg Meatballs",
					CookTime = "10-15",
					Price = 9,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-10.jfif",
					Tags = new List<string> { "Slow Food", "Meatballs", "Lunch" }
				},
				new Food
				{
					Id = 9,
					Name = "Pasta with Meatballs",
					CookTime = "15-20",
					Price = 12,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-11.jfif",
					Tags = new List<string> { "Slow Food", "Pasta", "Meatballs", "Lunch", "Dinner" }
				},
				new Food
				{
					Id = 10,
					Name = "Cinnabon",
					CookTime = "3-5",
					Price = 4,
					Favorite = true,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-12.jfif",
					Tags = new List<string> { "Deserts", "Cinnabon" }
				},
				new Food
				{
					Id = 11,
					Name = "Pancakes",
					CookTime = "3-5",
					Price = 6,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-14.jfif",
					Tags = new List<string> { "Deserts", "Pancakes" }
				},
				new Food
				{
					Id = 12,
					Name = "Chicken Pasta",
					CookTime = "10-15",
					Price = 10,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-16.jfif",
					Tags = new List<string> { "Slow Food", "Pasta", "Chickens", "Lunch", "Dinner" }
				},
				new Food
				{
					Id = 13,
					Name = "Cake with Nuts",
					CookTime = "4-6",
					Price = 5,
					Favorite = true,
					Stars = 4.5,
					ImageUrl = "../assets/foods/food-17.jfif",
					Tags = new List<string> { "Deserts", "Cakes", "Nuts" }
				},
				new Food
				{
					Id = 14,
					Name = "Chocolate Cake",
					CookTime = "4-6",
					Price = 4,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-18.jfif",
					Tags = new List<string> { "Deserts", "Cakes", "Chocolate" }
				},
				new Food
				{
					Id = 15,
					Name = "Honey Donets",
					CookTime = "3-5",
					Price = 2,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-19.jfif",
					Tags = new List<string> { "Deserts", "Donets", "Honey" }
				},
				new Food
				{
					Id = 16,
					Name = "Pasta with Shrimps",
					CookTime = "10-20",
					Price = 10,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-21.jfif",
					Tags = new List<string> { "Slow Food", "Pasta", "Shrimps", "Sea Food", "Lunch", "Dinner" }
				},
				new Food
				{
					Id = 17,
					Name = "Ice Coffee",
					CookTime = "1-3",
					Price = 4,
					Favorite = true,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-22.jfif",
					Tags = new List<string> { "Coffee", "Juices" }
				},
				new Food
				{
					Id = 18,
					Name = "Tea",
					CookTime = "2-3",
					Price = 3,
					Favorite = true,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-23.jfif",
					Tags = new List<string> { "Hot Drinks", "Tea" }
				},
				new Food
				{
					Id = 19,
					Name = "Coffee",
					CookTime = "2-3",
					Price = 4,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-24.jfif",
					Tags = new List<string> { "Coffee", "Hot Drinks" }
				},
				new Food
				{
					Id = 20,
					Name = "Tea with Milk",
					CookTime = "2-3",
					Price = 3,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-25.jfif",
					Tags = new List<string> { "Hot Drinks", "Tea", "Milk" }
				},
				new Food
				{
					Id = 21,
					Name = "Orange Juice",
					CookTime = "1-3",
					Price = 4,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-26.jfif",
					Tags = new List<string> { "Juices", "Orange", "Drinks" }
				},
				new Food
				{
					Id = 22,
					Name = "Watermelon Juice",
					CookTime = "1-2",
					Price = 4,
					Favorite = true,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-27.jfif",
					Tags = new List<string> { "Juices", "Drinks" }
				},
				new Food
				{
					Id = 23,
					Name = "Mango Juice",
					CookTime = "1-2",
					Price = 5,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-28.jfif",
					Tags = new List<string> { "Juices", "Drinks" }
				},
				new Food
				{
					Id = 24,
					Name = "Rice with Nuts",
					CookTime = "10-20",
					Price = 8,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-31.jfif",
					Tags = new List<string> { "Slow Food", "Rice", "Lunch", "Dinner" }
				},
				new Food
				{
					Id = 25,
					Name = "Fish",
					CookTime = "35-45",
					Price = 14,
					Favorite = true,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-32.jfif",
					Tags = new List<string> { "Sea Food", "Fish", "Lunch", "Dinner" }
				},
				new Food
				{
					Id = 26,
					Name = "Turky",
					CookTime = "45-60",
					Price = 25,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-34.jfif",
					Tags = new List<string> { "Slow Food", "Turky", "Lunch" }
				},
				new Food
				{
					Id = 27,
					Name = "Shawerma",
					CookTime = "5-10",
					Price = 7,
					Favorite = false,
					Stars = 4.5,
					ImageUrl = "../../assets/foods/food-35.jfif",
					Tags = new List<string> { "Fast Food", "Shawerma", "Lunch" }
				}
		};

		public static readonly List<Tag> Tags = new List<Tag>
		{
			new Tag { Name = "All" , count = 27},
			new Tag { Name = "Fast Food", count = 4 },
			new Tag { Name = "Slow Food", count = 7 },
			new Tag { Name = "Lunch", count = 14 },
			new Tag { Name = "Dinner", count = 6 },
			new Tag { Name = "Sea Food", count = 2 },
			new Tag { Name = "Deserts", count = 6 },
			new Tag { Name = "Juices", count = 4 },
			new Tag { Name = "Hot Drinks", count = 3 }
		};
	}
}
