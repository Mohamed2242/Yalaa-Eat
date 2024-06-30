import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = "https://localhost:7249/api/";

  constructor(private http: HttpClient) { }
  
  getOrdersForUser(email: string) {
    return this.http.get<Order[]>(this.baseUrl + 'Order/' + email);
  }
  
}
