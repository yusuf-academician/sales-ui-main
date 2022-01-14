import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../model/cart';
import { OrderConfig } from '../model/order';
import { CartService } from '../services/cart/cart.service';
import { OrderService } from '../services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  total: number = 0;
  calories: number = 0;
  caloriesUnit: string = "";
  order: OrderConfig[] = []
  error: String = '';
  currency!: any;
  title = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCartsByUser();
  }

  getCartsByUser() {
    this.cartService.getCartByUser().subscribe((data: any) => {
      console.log(data)
      this.carts = data.data;
      if (this.carts.length > 0) {
        this.currency = this.carts[0].menu.currency
      }
      this.cartService.setCarts(this.carts.length)
      this.total = data.meta.total;
      this.calories = data.meta.calories;
      this.caloriesUnit = data.meta.caloriesUnit;

      console.log(data.meta)
      console.log(this.carts)
    }, (error: any) => {
      console.log(error)
    })
  }

  removeCart(id: any) {
    this.cartService.removeCart(id).subscribe((data: any) => {
      console.log(data.msg);
      this.getCartsByUser()
    }, (error: any) => {
      console.log(error)
    })
  }

  updateCart(id: any, quantity: any, action: any) {
    let body = {}
    if (action === 'add' || (action === 'subtract' && quantity > 1)) {
      if (action === 'add') {
        body = {
          quantity: quantity + 1
        }
      } else {
        body = {
          quantity: quantity - 1
        }
      }
    } else {
      this.error = 'Invalid Operation';
      return;
    }
    this.cartService.updateCart(id, body).subscribe((data: any) => {
      console.log(data.msg);
      this.getCartsByUser();
    }, (error: any) => {
      console.log(error)
    })
  }

  calculate(amount: number, quantity: number) {
    return amount * quantity
  }

  proceedToCheckout(){
    this.router.navigate(['/check-out']);
  }

}
