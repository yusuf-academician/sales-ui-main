import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { faAngleDown, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { CartService } from './services/cart/cart.service';
import { Cart } from './model/cart';
import { MenuService } from './services/menu/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from './model/menu';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit  {
  title = 'sales-point';
  down = faAngleDown
  cart = faShoppingCart
  carts: Cart[] = [];
  menus: Menu[] = []
  isLogged!:Boolean
  isLoading = false;
  searchForm!: FormGroup
  submit: boolean = false
  constructor(private authService: AuthService,
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    private router: Router,private cartService: CartService){
  }

  ngOnInit(): void {
    this.authService.authState.subscribe(value =>{
      if(value === true){
        this.cartService.cartState.subscribe(value =>{
          this.getUsersCart()
        })
      }
      this.isLogged = value;
    });
    console.log(this.authService.isUserLoggedIn());
    this.createSearchForm();
  }

  createSearchForm(){
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  get f(){
    return this.searchForm.controls
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  getUsersCart(){
    this.cartService.getCartByUser().subscribe((data) => {
      this.carts = data.data
    }, error => {
      console.log(error)
    })
  }

  searchMenus(){
    this.submit = true;
    if(this.searchForm.invalid){
      return;
    }
    this.menuService.searchMenus(this.searchForm.get('name')?.value).subscribe((data) => {
      this.menus = data.data
    }, error => {
      console.log(error)
    })
  }

  openPage(url:any){
    console.log(this.searchForm.get('name')?.value)
    this.menuService.searchMenus(this.searchForm.get('name')?.value).subscribe((data) => {
      let menuId = data.data[0]._id
      this.router.navigateByUrl('/',{skipLocationChange: true}).then(() => {
        this.router.navigate([url, menuId])
      })
    }, error => {
      console.log(error)
    })
  }
}
