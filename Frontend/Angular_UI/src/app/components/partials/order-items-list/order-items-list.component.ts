import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../../models/order/order.model';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.scss'
})
export class OrderItemsListComponent {

  @Input()
  order!:Order;
  constructor() { }

  ngOnInit(): void {
  }
  
}
