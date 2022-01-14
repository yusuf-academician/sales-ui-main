import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Menu } from '../model/menu';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menus: Menu[] = []
  filter!: FormGroup
  submit: Boolean = false
  constructor
  (private menuService: MenuService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getMenus()
    this.createFilterForm()
  }

  createFilterForm(){
    this.filter = this.formBuilder.group({
      min: ['', Validators.required],
      max: ['', Validators.required],
      postCode: ['', Validators.required]
    })
  }

  get f(){
    return this.filter.controls
  }
  getMenus(){
    this.menuService.getMenus().subscribe((data) => {
      this.menus = data.data;
      console.log(this.menus)
    }, error => {
      console.log(error)
    })
  }

  openPage(url:any,menuId: any){
    this.router.navigate([url,menuId])
  }

  onSubmit(){
    this.submit = true;
    if(this.filter.invalid){
      return
    }
    let body = {
      filter:{
        "price":{
          "$gt": parseInt(this.filter.get('min')?.value),
          "$lt": parseInt(this.filter.get('max')?.value)
        },
        "postCode": this.filter.get('postCode')?.value
      }
    }
    console.log(body)
    this.menuService.searchMenusByPriceandPostCode(body).subscribe((data) => {
      console.log(data)
      this.menus = data.data
      // this.filter.reset();
      // Object.keys(this.filter.controls).forEach(key => {
      //   this.filter.get(key)?.setErrors(null) ;
      // });
    }, error => {
      console.log(error)
    })
  }
}
