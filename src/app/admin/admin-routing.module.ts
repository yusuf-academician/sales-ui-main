import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { CategoryComponent } from './category/category.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { ProfileComponent } from '../customer/profile/profile.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'profile'},
  {path:'profile', component: ProfileComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'ingredient', component: IngredientComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'shop-detail/:shopId', component: ShopDetailComponent},
  {path: 'orders', component: OrdersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
