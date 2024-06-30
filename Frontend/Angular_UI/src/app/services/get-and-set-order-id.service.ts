import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAndSetOrderIdService {

  constructor() { }

  orderId!: number; 
    
  setOrderId(orderId: number): void {
    this.orderId = orderId;
  }

  getOrderId(): number {
    return this.orderId;
  }
}
