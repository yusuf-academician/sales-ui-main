import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../model/cart';
import { Menu } from '../model/menu';
import { AuthService } from '../services/auth/auth.service';
import { CartService } from '../services/cart/cart.service';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu!: Menu;
  totalCalories = 0;
  calorieUnit: String = ''
  others: Menu[] = [];
  constructor(private menuService: MenuService,
    private actRouter: ActivatedRoute, private router: Router, private cartService: CartService, private authService: AuthService
  ) { }

  ngOnInit(): void {
    const menuId = this.actRouter.snapshot.params['menuId'];
    console.log(menuId);
    this.getMenuById(menuId);
  }

  getMenuById(id: any){
    this.menuService.getMenuById(id).subscribe((data) => {
      this.menu = data.data;
      for(let i= 0;i< this.menu.ingredients.length; i++){
        this.calorieUnit =  this.menu.ingredients[0].calorieUnit;
        this.totalCalories += this.menu.ingredients[i].calorie
      }
      console.log(this.menu, this.totalCalories, this.calorieUnit);
      this.getMenuByCategory(this.menu.category._id)
    }, error => {
      console.log(error)
    })
  }

  getMenuByCategory(categoryId: any){
    this.menuService.getMenuByCategory(categoryId).subscribe((data) => {
      console.log(data)
      this.others = data.data
    }, error => {
      console.log(error)
    })
  }

  openPage(url:any,menuId: any){
    this.router.navigateByUrl('/',{skipLocationChange: true}).then(() => {
      this.router.navigate([url, menuId])
    })
  }

  getCartsByUser(){
    this.cartService.getCartByUser().subscribe((data: any) => {
      console.log(data.data)
      this.cartService.setCarts(data.data.length)
    }, (error: any) => {
      console.log(error)
    })
  }
  addCart(id: any){
    if(!this.authService.isUserLoggedIn()){
      this.router.navigate(['/login']);
      return;
    }
    let cart = {
      menu: id,
      quantity: 1,
      amount: this.menu.price * 1
    }
    console.log(cart)
    this.cartService.AddCart(cart).subscribe((data) => {
      console.log(data.msg)
      this.getCartsByUser()
    }, err => {
      console.log(err)
    })
  }
}
