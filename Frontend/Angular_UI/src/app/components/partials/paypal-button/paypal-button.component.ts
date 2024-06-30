import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../models/order/order.model';
import { OrderService } from '../../../services/order/order.service';
import { CartService } from '../../../services/cart/cart.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.scss'
})
export class PaypalButtonComponent implements OnInit {
  @Input()
  order!:Order;

  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private router:Router,
              private toast: NgToastService) { }

  ngOnInit(): void {
    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentIntentId = payment.id;
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toast.success({detail:"SUCCESS", summary:"Payment Saved Successfully", duration: 3000});

            },
            error: (error) => {
              this.toast.error({detail:"ERROR", summary:"Payment Save Failed", duration: 3000});
            }
          }
        );
      },

      onError: (err: any) => {
        this.toast.error({detail:"ERROR", summary:"Payment Failed", duration: 3000});
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);
  }
}
