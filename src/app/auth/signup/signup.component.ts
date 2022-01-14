import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/UserService/user.service';
import { gender } from 'src/app/data/data';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  sign!: FormGroup
  isError: boolean = false
  errorStatment!: String
  submitSignUp: boolean = false;
  user!: User
  countryCode: any[] = [];
  genders: any[] = gender;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.signForm();
  }

  signForm() {
    this.sign = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender:['', Validators.required],
      role:['user']
    });
  }

  get f() {
    return this.sign.controls;
  }

  signUp() {
    this.submitSignUp = true;
    if (this.sign.invalid) {
      return;
    }
    this.user = this.sign.value;
    console.log(this.user);
    this.userService.createUser(this.user).subscribe((data) => {
      console.log(data)
      this._route.navigate(['./login'])
    }, error => {
      this.isError = true
      this.errorStatment = error
      console.log("error", this.errorStatment);
    })
  }

}
