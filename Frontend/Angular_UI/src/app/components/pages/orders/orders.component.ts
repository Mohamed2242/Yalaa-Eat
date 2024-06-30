import { Component, OnInit } from '@angular/core';
import { Order, orderStatusMap } from '../../../models/order/order.model';
import { OrdersService } from '../../../services/orders/orders.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UserStoreService } from '../../../services/user-store/user-store.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  Email: string = ""
  constructor(
    private ordersService:OrdersService,
    private auth:AuthService,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.userStore.getEmailFromStore().subscribe(val => {
      const EmailFromToken = this.auth.getEmailFromToken();
      if (val) {
        this.Email = val;
      } else if (EmailFromToken) {
        this.Email = EmailFromToken;
      } 
    });
    
    this.getOrders();
  }
  
  getOrders() {
    this.ordersService.getOrdersForUser(this.Email).subscribe({
      next: (orders) => { 
        this.orders = orders
      },
      error:(error) => {
        console.error(error); // Log the error for debugging purposes
      }
    })
  }

  getOrderStatusText(status: string): string {
    return orderStatusMap[status] || 'Payed';
  }
}
