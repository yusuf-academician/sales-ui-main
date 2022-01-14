import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopComponent1 } from './shop/shop.component';
import { OrderComponent } from './order/order.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ShopComponent,
    OrderComponent,
    MenuComponent,
    ShopComponent1
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class ShopModule { }
