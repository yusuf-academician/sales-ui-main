import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from './password/password.component';
import { HeightComponent } from './height/height.component';
import { WeightComponent } from './weight/weight.component';
import { SettingComponent } from './setting/setting.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CustomerComponent,
    ProfileComponent,
    OrdersComponent,
    PasswordComponent,
    HeightComponent,
    WeightComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
