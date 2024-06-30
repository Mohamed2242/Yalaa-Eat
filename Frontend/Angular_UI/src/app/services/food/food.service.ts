import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Foods } from '../../models/food/food.model';
import { Tag } from '../../models/tag/tag';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient, private route: Router) { }

  private baseUrl: string = "https://localhost:7249/api/Food/";  

  getAllFoods(): Observable<Foods[]> {
    return this.http.get<Foods[]>(`${this.baseUrl}`);
  }
  getFoodById(foodId:number): Observable<Foods>{
    return this.http.get<Foods>(`${this.baseUrl}${foodId}`)
  }
  getAllFoodsBySearchTerm(searchTerm: string){
    return this.http.get<Foods[]>(`${this.baseUrl}search/:${searchTerm}`)
  }
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}tags`);
  }
  getAllFoodsByTag(tag: string): Observable<Foods[]>{
    if(tag === "All")
      return this.getAllFoods();
    return this.http.get<Foods[]>(`${this.baseUrl}tag/:${tag}`)
  }

  /*getAll():Foods[]{
    return [
      {
        id: 1,
        name: 'Spicy Hamburger',
        cookTime: '10-15',
        price: 8,
        favorite: true,
        stars: 4,
        imageUrl: '../../assets/foods/food-1.jfif',
        tags: ['Fast Food', 'Hamburger', 'Lunch']
      },
      {
        id: 2,
        name: 'Hamburger',
        cookTime: '10-20',
        price: 7,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-2.jfif',
        tags: ['Fast Food', 'Hamburger', 'Lunch']
      },
      {
        id: 3,
        name: '(1/2)kg Shawerma',
        cookTime: '5-10',
        price: 12,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-3.jfif',
        tags: ['Slow Food', 'Shawerma', 'Lunch']
      },
      {
        id: 4,
        name: '(1/4)kg Chicken Drumsticks',
        cookTime: '10-20',
        price: 10,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-5.jfif',
        tags: ['Chickens', 'Lunch']
      },
      {
        id: 5,
        name: '(1/2)kg Fried Shrimps',
        cookTime: '20-30',
        price: 15,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-6.jfif',
        tags: ['Sea Food', 'Shrimps', 'Lunch', 'Dinner']
      },
      {
        id: 6,
        name: 'Pizza Pepperoni',
        cookTime: '15-25',
        price: 12,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-7.jfif',
        tags: ['Fast Food', 'Pizza', 'Lunch']
      },
      {
        id: 7,
        name: 'Suger Donets',
        cookTime: '3-5',
        price: 2,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-8.jfif',
        tags: ['Deserts', 'Donets','Suger']
      },
      {
        id: 8,
        name: '(1/2)kg Meatballs',
        cookTime: '10-15',
        price: 9,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-10.jfif',
        tags: ['Slow Food', 'Meatballs', 'Lunch']
      },
      {
        id: 9,
        name: 'Pasta with Meatballs',
        cookTime: '15-20',
        price: 12,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-11.jfif',
        tags: ['Slow Food', 'Pasta', 'Meatballs',  'Lunch', 'Dinner']
      },
      {
        id: 10,
        name: 'Cinnabon',
        cookTime: '3-5',
        price: 4,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-12.jfif',
        tags: ['Deserts', 'Cinnabon']
      },
      {
        id: 11,
        name: 'Pancakes',
        cookTime: '3-5',
        price: 6,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-14.jfif',
        tags: ['Deserts', 'Pancakes']
      },
      {
        id: 12,
        name: 'Chicken Pasta ',
        cookTime: '10-15',
        price: 10,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-16.jfif',
        tags: ['Slow Food', 'Pasta', 'Chickens','Lunch', 'Dinner']
      },
      {
        id: 13,
        name: 'Cake with Nuts',
        cookTime: '4-6',
        price: 5,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-17.jfif',
        tags: ['Deserts', 'Cakes', 'Nuts']
      },
      {
        id: 14,
        name: 'Chocolate Cake',
        cookTime: '4-6',
        price: 4,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-18.jfif',
        tags: ['Deserts', 'Cakes', 'Chocolate']
      },
      {
        id: 15,
        name: 'Honey Donets',
        cookTime: '3-5',
        price: 2,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-19.jfif',
        tags: ['Deserts', 'Donets', 'Honey']
      },
      {
        id: 16,
        name: 'Pasta with Shrimps',
        cookTime: '10-20',
        price: 10,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-21.jfif',
        tags: ['Slow Food', 'Pasta', 'Shrimps', 'Sea Food', 'Lunch', 'Dinner']
      },
      {
        id: 17,
        name: 'Ice Coffee',
        cookTime: '1-3',
        price: 4,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-22.jfif',
        tags: ['Coffee', 'Juices']
      },
      {
        id: 18,
        name: 'Tea',
        cookTime: '2-3',
        price: 3,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-23.jfif',
        tags: ['Hot Drinks', 'Tea']
      },
      {
        id: 19,
        name: 'Coffee',
        cookTime: '2-3',
        price: 4,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-24.jfif',
        tags: ['Coffee', 'Hot Drinks']
      },
      {
        id: 20,
        name: 'Tea with Milk',
        cookTime: '2-3',
        price: 3,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-25.jfif',
        tags: ['Hot Drinks', 'Tea', 'Milk']
      },
      {
        id: 21,
        name: 'Orange Juice',
        cookTime: '1-3',
        price: 4,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-26.jfif',
        tags: ['Juices', 'Orange', 'Drinks']
      },
      {
        id: 22,
        name: 'Watermelon Juice',
        cookTime: '1-2',
        price: 4,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-27.jfif',
        tags: ['Juices', 'Drinks']
      },
      {
        id: 23,
        name: 'Mango Juice',
        cookTime: '1-2',
        price: 5,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-28.jfif',
        tags: ['Juices', "Drinks"]
      },
      {
        id: 24,
        name: 'Rice with Nuts',
        cookTime: '10-20',
        price: 8,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-31.jfif',
        tags: ['Slow Food', 'Rice', 'Lunch', 'Dinner']
      },
      {
        id: 25,
        name: 'Fish',
        cookTime: '35-45',
        price: 14,
        favorite: true,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-32.jfif',
        tags: ['Sea Food', 'Fish', 'Lunch', 'Dinner']
      },
      {
        id: 26,
        name: 'Turky',
        cookTime: '45-60',
        price: 25,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-34.jfif',
        tags: ['Slow Food', 'Turky', 'Lunch']
      },
      {
        id: 27,
        name: 'Shawerma',
        cookTime: '5-10',
        price: 7,
        favorite: false,
        stars: 4.5,
        imageUrl: '../../assets/foods/food-35.jfif',
        tags: ['Fast Food', 'Shawerma', 'Lunch']
      },
    ]
  }*/
}
