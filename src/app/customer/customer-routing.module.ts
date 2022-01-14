import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeightComponent } from './height/height.component';
import { OrdersComponent } from './orders/orders.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { WeightComponent } from './weight/weight.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo: 'profile'},
  {path:'profile', component: ProfileComponent},
  {path:'order', component: OrdersComponent},
  {path:'change-password', component: PasswordComponent},
  {path:'change-weight', component: WeightComponent},
  {path:'change-height', component: HeightComponent},
  {path:'change-details', component: SettingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
