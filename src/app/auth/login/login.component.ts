import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  submitLogin = false;
  isError: boolean = false;
  errorMsg!: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm();
  }

  loginForm() {
    this.login = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.login.controls;
  }

  signIn() {
    this.submitLogin = true;
    if (this.login.invalid) {
      return;
    }
    console.log(this.login.value);
    this.authService
      .login(this.login.get('email')?.value, this.login.get('password')?.value)
      .pipe(first())
      .subscribe(
        (data: { meta: string }) => {
          if (data.meta === 'administrator') {
            this._router.navigate(['../admin']);
          } else if (data.meta === 'user') {
            this._router.navigate(['../home']);
          }
        },
        (error: any) => {
          this.isError = true;
          this.errorMsg = error;
          console.log('erro', this.errorMsg);
          console.log(this.errorMsg.error.msg);
        }
      );
  }
}
