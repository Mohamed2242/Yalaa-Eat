import { CartItem } from "../cart-item/cart-item";

export class Cart{
    items:CartItem[] = [];
    totalPrice:number = 0;
    totalCount:number = 0;
}