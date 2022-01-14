import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { height} from 'src/app/data/data';;

@Component({
  selector: 'app-height',
  templateUrl: './height.component.html',
  styleUrls: ['./height.component.scss']
})
export class HeightComponent implements OnInit {
  changeHeight!: FormGroup
  isHeight: boolean = false;
  responseMessage!: string;
  height = height



  constructor(    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.heightForm();

  }
  heightForm(){
    this.changeHeight = this._formBuilder.group({
      targetHeight:['', Validators.required],
      currentHeight:['', Validators.required],
      heightUnit: ['', Validators.required]
    })
  }
  get g(){
    return this.changeHeight.controls
  }
  onSaveHeight(){
    this.isHeight = true;
    if(this.changeHeight.invalid){
      return;
    }
    console.log(this.changeHeight.value)
    this.userService.updateUser(this.changeHeight.value).subscribe((data) => {
      console.log(data)
      this.responseMessage = data.msg
      this.changeHeight.reset()
      Object.keys(this.changeHeight.controls).forEach(key => {
        this.changeHeight.get(key)?.setErrors(null) ;
      });
      this.router.navigate(['/customer/profile'])
    },error => {
      console.log(error)
    })
  }
}
