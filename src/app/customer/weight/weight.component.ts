import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { weight } from 'src/app/data/data';import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';
;

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  changeWeight!: FormGroup
  isWeight: boolean = false;
  weight = weight;
  responseMessage!: string;


  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.weightForm();

  }
  weightForm(){
    this.changeWeight = this._formBuilder.group({
      currentWeight: ['', Validators.required],
      targetWeight:['', Validators.required],
      weightUnit: ['', Validators.required]
    })
  }

  get e(){
    return this.changeWeight.controls
  }

  onSaveWeight(){
    this.isWeight = true;
    if(this.changeWeight.invalid){
      return;
    }
    console.log(this.changeWeight.value)
    this.userService.updateUser(this.changeWeight.value).subscribe((data) => {
      console.log(data)
      this.responseMessage = data.msg
      this.changeWeight.reset()
      Object.keys(this.changeWeight.controls).forEach(key => {
        this.changeWeight.get(key)?.setErrors(null) ;
      });
      this.router.navigate(['/customer/profile'])
    },error => {
      console.log(error)
    })
  }

}
