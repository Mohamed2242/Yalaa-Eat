import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserStoreService } from '../../../services/user-store/user-store.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  // public users:any = [];
  public role!:string;
  public Name : string = "";
  
  cartQuantity=0;
  
  constructor(
    //private api : ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
    cartService: CartService
    ) 
    { 
      cartService.getCartObservable().subscribe((newCart) => {
        this.cartQuantity = newCart.totalCount;
      })
    }

  ngOnInit() {
    this.userStore.getNameFromStore().subscribe(val => {
      const NameFromToken = this.auth.getNameFromToken();
      if (val) {
        this.Name = val;
      } else if (NameFromToken) {
        this.Name = NameFromToken;
      } 
    });

    this.userStore.getRoleFromStore().subscribe(val => {
      const roleFromToken = this.auth.getRoleFromToken();
      if (val) {
        this.role = val;
      } else if (roleFromToken) {
        this.role = roleFromToken;
      }
    });
  }

  logout(){
    this.auth.signOut();
    this.Name="";
  }

  get isAuth(){
    return this.userStore.getNameFromStore();
  }
}
