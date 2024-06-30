import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart/cart';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Foods } from '../../models/food/food.model';
import { CartItem } from '../../models/cart-item/cart-item';
import { FoodService } from '../food/food.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor(private foodService:FoodService) { }

  addToCart(food:Foods):void{
    let cartItem = this.cart.items
      .find(item => item.productItemId === food.id);
    if(cartItem)
      return;

    var cartota = this.mapProductItemToBasketItem(food)
      this.cart.items.push(cartota);    
      this.setCartToLocalStorage();
  }

  private mapProductItemToBasketItem(item: Foods): CartItem {
    return {
      productItemId:item.id,
      productName: item.name,
      pictureUrl: item.imageUrl,
      price: item.price,
      quantity: 1,
    }
  }
    removeFromCart(foodId:number):void{
      this.cart.items = this.cart.items
        .filter(item => item.productItemId != foodId);
      this.setCartToLocalStorage();
    }

    changeQuantity(foodId: number, quantity: number) {
      
      this.foodService.getFoodById(foodId)
      .pipe(take(1)) // Take only the first emitted value
      .subscribe(foodItem => {
        if (!foodItem) return;
  
        let cartItem = this.cart.items
        .find(item => item.productItemId === foodId);
        if(!cartItem) return;
        
        cartItem.quantity = quantity;
        cartItem.price = foodItem.price * quantity; // Calculate the new price
        this.setCartToLocalStorage();
      });
      this.setCartToLocalStorage();
    }

    clearCart() {
      this.cart = new Cart();
      this.setCartToLocalStorage();
    }

    getCartObservable():Observable<Cart>{
      return this.cartSubject.asObservable();
    }

    getCart(): Cart{
      return this.cartSubject.value;
    }

    private setCartToLocalStorage():void{
      this.cart.totalPrice = this.cart.items
        .reduce ((prevSum, currentItem) => prevSum + currentItem.price, 0);
      this.cart.totalCount = this.cart.items
        .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
      
      const cartJson = JSON.stringify(this.cart);
      localStorage.setItem('Cart', cartJson);
      this.cartSubject.next(this.cart);
    }

    private getCartFromLocalStorage(): Cart {
      const cartJson = localStorage.getItem('Cart');
      return cartJson ? JSON.parse(cartJson) : new Cart();
    }
}
