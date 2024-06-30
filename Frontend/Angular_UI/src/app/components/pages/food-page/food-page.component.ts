import { Component } from '@angular/core';
import { Foods } from '../../../models/food/food.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food/food.service';
import { CartService } from '../../../services/cart/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss'
})
export class FoodPageComponent {
  food!:Foods;
  constructor(
    activatedRoute: ActivatedRoute, 
    foodService: FoodService,
    private cartService:CartService, 
    private toast:NgToastService,
    ){
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
        foodService.getFoodById(params['id']).subscribe(foodService=>{
          this.food = foodService;
        });
    })
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.toast.success({detail:"SUCCESS", summary:"Item Added To The Cart", duration: 1500});
  }
}
