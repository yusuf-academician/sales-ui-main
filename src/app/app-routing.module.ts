import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGraudService as AuthGuard } from 'src/app/services/routing-service/auth-graud.service'
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { MenuComponent } from './menu/menu.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'home', component: HomeComponent},
  {
    path: 'cart',
    component: CartComponent,
    canActivate:[AuthGuard],
  },
  {path: 'category', component: CategoryComponent},
  {
    path: 'check-out',
    component: CheckoutComponent,
    canActivate:[AuthGuard],
  },
  {path:'menu', component: MenuComponent},
  {path:'menu/:menuId', component: MenuComponent},
  {path:'', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path:'customer',
    canActivate:[AuthGuard],
    component: CustomerComponent,
    children:[
    {
      path:'',
      loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
    }
  ]},
  {
    path:'shop',
    canActivate:[AuthGuard],
    component: ShopComponent,
    children:[
    {
      path:'',
      loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
    }
  ]},
  {
    path:'admin',
    canActivate:[AuthGuard],
    component: AdminComponent,
    children:[
    {
      path:'',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    }
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
