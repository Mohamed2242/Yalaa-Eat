import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { HomeComponent } from './components/pages/home/home.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { ResetComponent } from './components/pages/reset/reset.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { OrderTrackComponent } from './components/pages/order-track/order-track.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrdersComponent } from './components/pages/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ResetComponent,
    WelcomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    HeaderComponent,
    NotFoundComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    LoadingComponent,
    PaymentComponent,
    OrderTrackComponent,
    PaypalButtonComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(withFetch()), // Use withFetch() here
    //OrderService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoadingInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
