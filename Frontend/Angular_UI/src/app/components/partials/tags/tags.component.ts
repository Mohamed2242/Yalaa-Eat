import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food/food.service';
import { Tag } from '../../../models/tag/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent implements OnInit {
  tags?:Tag[];
  constructor(foodService:FoodService) {
    foodService.getAllTags().subscribe(foodService=>{
      this.tags = foodService;
    });
   }
  ngOnInit(): void {
  }


}
