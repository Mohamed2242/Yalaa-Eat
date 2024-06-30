import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { HomeComponent } from './components/pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ResetComponent } from './components/pages/reset/reset.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { OrderTrackComponent } from './components/pages/order-track/order-track.component';
import { OrdersComponent } from './components/pages/orders/orders.component';

const routes: Routes = [
  {path:'', redirectTo:'welcome', pathMatch:'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivate:[authGuard]},
  {path: 'reset', component: ResetComponent},
  {path: 'search/:searchTerm', component:HomeComponent},
  {path: 'tag/:tag', component: HomeComponent},
  {path: 'food/:id', component: FoodPageComponent},
  {path: 'cart-page', component: CartPageComponent},
  {path: 'checkout', component: CheckoutPageComponent, canActivate:[authGuard]},
  {path: 'payment', component: PaymentComponent},
  {path: 'track/:orderId', component: OrderTrackComponent},
  {path: 'orders', component: OrdersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
