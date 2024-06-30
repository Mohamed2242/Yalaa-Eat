import { v4 } from "uuid";
import { CartItem } from "../cart-item/cart-item";


export class Order{
    id:number = 0;
    orderItems!:CartItem[];
    totalPrice!:number;
    name!:string;
    buyerEmail!:string;
    address!:string;
    paymentIntentId!:string;
    orderDate!:string;
    status!:string;
}

export enum OrderStatus {
    Pending,
    PaymentReceived,
    PaymentFailed
}
  
export const orderStatusMap: { [key: string]: string } = {
    [OrderStatus.Pending]: 'Pending',
    [OrderStatus.PaymentReceived]: 'Payment Received',
    [OrderStatus.PaymentFailed]: 'Payment Failed'
};


