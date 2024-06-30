import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus, orderStatusMap } from '../../../models/order/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { UserStoreService } from '../../../services/user-store/user-store.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrl: './order-track.component.scss'
})
export class OrderTrackComponent implements OnInit {

  order!:Order;
  public Name : string = "";
  public Email : string = "";
  
  constructor(
    orderService:OrderService,
    router: Router,
    private auth:AuthService,
    private userStore: UserStoreService,
  ) {
     orderService.getNewOrderForCurrentUser().subscribe({
        next: (order) => {
          orderService.addingOrder(order.id)
          this.order = order;
        },
        error:(error) => {
          console.error(error); // Log the error for debugging purposes
          router.navigateByUrl('/payment'); // Navigate to the '/checkout' route instead of '/chekcout'
        }
      })

  }

  ngOnInit(): void {
    this.userStore.getNameFromStore().subscribe(val => {
      const NameFromToken = this.auth.getNameFromToken();
      if (val) {
        this.Name = val;
      } else if (NameFromToken) {
        this.Name = NameFromToken;
      } 
    });
    this.userStore.getEmailFromStore().subscribe(val => {
      const EmailFromToken = this.auth.getEmailFromToken();
      if (val) {
        this.Email = val;
      } else if (EmailFromToken) {
        this.Email = EmailFromToken;
      } 
    });
  }
  getOrderStatusText(status: string): string {
    return orderStatusMap[status] || 'Unknown';
  }
  
}
