import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food/food.service';
import { Foods } from '../../../models/food/food.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  foodItems: Foods[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodObservable: Observable<Foods[]>
    activatedRoute.params.subscribe((params) =>{
      if(params['searchTerm']){
        foodObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      }
      else if (params['tag'])
        foodObservable = this.foodService.getAllFoodsByTag(params['tag']);
      else
        foodObservable = this.foodService.getAllFoods();

        foodObservable.subscribe((foodService)=>{
          this.foodItems = foodService;
        })
    })
  }

  ngOnInit(): void {
  }
}