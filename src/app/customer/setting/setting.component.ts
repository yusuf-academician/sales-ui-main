import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  changeName!: FormGroup
  isName: boolean = false;

  responseMessage!: string;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.nameForm();

  }
  nameForm(){
    this.changeName = this._formBuilder.group({
      name: ['', Validators.required]
    })
  }

  get d(){
    return this.changeName.controls
  }

  onSaveUsername(){
    this.isName = true;
    if(this.changeName.invalid){
      return;
    }
    console.log(this.changeName.value)
    this.userService.updateUser(this.changeName.value).subscribe((data) => {
      console.log(data)
      this.responseMessage = data.msg
      this.changeName.reset();
      Object.keys(this.changeName.controls).forEach(key => {
        this.changeName.get(key)?.setErrors(null) ;
      });
      this.router.navigate(['/customer/profile'])
    },error => {
      console.log(error)
    })
  }
}
