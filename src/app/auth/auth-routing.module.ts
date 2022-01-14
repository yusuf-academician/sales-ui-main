import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',pathMatch:'full', redirectTo:'login'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'forgot-password/:token/:email', component: ForgotPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
