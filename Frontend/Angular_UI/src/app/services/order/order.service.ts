import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item/cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = "https://localhost:7249/api/Order/";  

  public counter: number = 0;
  public orderId: number[] = [];

  constructor(private http: HttpClient) { }

  createOrder(order:Order){
    return this.http.post<Order>(`${this.baseUrl}create`, order);
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(`${this.baseUrl}newOrderForCurrentUser`);
  }

  pay(order:Order):Observable<string>{
    return this.http.post<string>(`${this.baseUrl}pay`,order);
  }

  trackOrderById(id:number): Observable<Order>{
    return this.http.get<Order>(`${this.baseUrl}trackOrder/${id}`);
  }

  addingOrder(orderId: number) {
    this.orderId[this.counter] = orderId;
    this.counter += 1;
  }
}
