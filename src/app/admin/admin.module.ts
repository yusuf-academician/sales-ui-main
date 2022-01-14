import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { ShopComponent } from './shop/shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AdminComponent,
    CategoryComponent,
    IngredientComponent,
    ShopComponent,
    ShopDetailComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class AdminModule { }
