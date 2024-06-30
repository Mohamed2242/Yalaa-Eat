import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/order/order.model';
import { CartService } from '../../../services/cart/cart.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UserStoreService } from '../../../services/user-store/user-store.service';
import { GetAndSetOrderIdService } from '../../../services/get-and-set-order-id.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})

export class PaymentComponent implements OnInit {

  order:Order = new Order();
  public Name : string = "";
  public Email : string = "";

  constructor(
    private orderService: OrderService, 
    router: Router, 
    cartService: CartService,
    private auth:AuthService,
    private userStore: UserStoreService,
    private getAndSetOrderIdService:GetAndSetOrderIdService
    ) {
       const cart = cartService.getCart();
      
      orderService.getNewOrderForCurrentUser().subscribe({
        next: (order) => {
          this.order = order;
        },
        error:(error) => {
          console.error(error); // Log the error for debugging purposes
          router.navigateByUrl('/checkout'); // Navigate to the '/checkout' route instead of '/chekcout'
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

}