import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { ShopComponent1 } from './shop/shop.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'shop'},
  {path:'shop', component: ShopComponent1},
  {path:'menu', component: MenuComponent},
  {path:'order', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
