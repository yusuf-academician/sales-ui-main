import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  password!: FormGroup
  isPassword: boolean = false

  responseMessage!: string;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.passwordForm();

  }
  passwordForm(){
    this.password = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    })
  }
  get f(){
    return this.password.controls
  }

  onSavePassword(){
    this.isPassword = true;
    if(this.password.invalid){
      return;
    }
    console.log(this.password.value);
    this.authService.changePassword(this.password.value).subscribe((data) => {
      console.log(data);
      this.responseMessage = data.msg
      this.router.navigate(['/login'])
    },error => {
      console.log(error)
    })
  }
}
