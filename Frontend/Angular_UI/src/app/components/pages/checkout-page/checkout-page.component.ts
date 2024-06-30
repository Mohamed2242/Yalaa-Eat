import { Component, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../../models/order/order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart/cart.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UserStoreService } from '../../../services/user-store/user-store.service';
import { NgToastService } from 'ng-angular-popup';
import { NavigationExtras, Router } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';


@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent implements OnInit{

  order:Order = new Order();
  checkoutForm!: FormGroup;
  public Name : string = "";
  public Email : string = "";
  public orderId !: number;
  getAndSetOrderId: any;
  constructor(
    cartService:CartService,
    private formBuilder:FormBuilder,
    private auth: AuthService, 
    private userStore: UserStoreService,
    private toast:NgToastService,
    private router:Router,
    private orderService: OrderService,
    ) 
    {
      const cart = cartService.getCart();  
      this.order.orderItems = cart.items;
      this.order.totalPrice = cart.totalPrice;
    }

  ngOnInit(): void {
    
    this.userStore.getNameFromStore().subscribe(val1 => {
      const NameFromToken = this.auth.getNameFromToken();
      if (val1) {
        this.Name = val1;
      } else if (NameFromToken) {
        this.Name = NameFromToken;
      } 
    });
    this.userStore.getEmailFromStore().subscribe(val2 => {
      const EmailFromToken = this.auth.getEmailFromToken();
      if (val2) {
        this.Email = val2;
      } else if (EmailFromToken) {
        this.Email = EmailFromToken;
      } 
    });
    this.checkoutForm = this.formBuilder.group({
    })
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    this.order.buyerEmail = this.Email;

    this.orderService.createOrder(this.order).subscribe({
      next:() => {
        this.toast.success({detail:"SUCCESS", summary:"Order is Confirmed", duration: 3000});
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse:any) => {
        this.toast.error({detail:"ERROR", summary:"Cart Items Are Empty!", duration: 3000});
      }
    })
  }
}
