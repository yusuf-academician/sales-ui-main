import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Cart } from '../model/cart';
import { Order, OrderConfig } from '../model/order';
import { User } from '../model/user';
import { CartService } from '../services/cart/cart.service';
import { OrderService } from '../services/order/order.service';
import { UserService } from '../services/UserService/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  user!: User;
  carts: Cart[] = [];
  orders: Order[] = [];
  total: number = 0;
  currency!: any;
  calories: number = 0;
  caloriesUnit: string = "";
  addressForm!: FormGroup;
  submit: Boolean = false;
  address: String = "";
  order: OrderConfig[] = []
  totalCalories: number = 0;
  @Input() amount: any;
  @Input() decription: any;
  handler!: any;
  isCheckout: Boolean = false
  stripToken: any;
  calorieIntake: number = 0;
  itemPerPage = 5;
  paginationConfig:any = {};

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCartsByUser();
    this.createForm();
    this.loadStripe();
    this.getOrdersByUserfind()
    this.paginationConfig = {
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItem: this.orders ? this.orders.length : 0
    }
  }

  createForm() {
    this.addressForm = this.formBuilder.group({
      address: ['', Validators.required]
    })
  }

  pageChanged(event: any){
    this.paginationConfig.currentPage = event;
  }

  onSubmit() {
    this.submit = true;
    if (this.addressForm.invalid) {
      return;
    }
    this.address = this.addressForm.get('address')?.value;
    console.log(this.address);
  }

  get f() {
    return this.addressForm.controls;
  }

  getCartsByUser() {
    this.cartService.getCartByUser().subscribe((data: any) => {
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

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data.data
      this.calorieIntake = this.user.gender === 'M' ? 2500: 2000;
    }, error => {
      console.log(error);
    })
  }

  getOrdersByUserfind(){
    this.orderService.getOrdersByUserfind().subscribe((data: any) => {
      console.log(data)
      this.orders = data.data;
      if (this.orders.length > 1){
        for(let i = 0; i < this.orders.length; i++){
          this.totalCalories += this.orders[i].calorie * this.orders[i].quantity;
        }
      }else{
        this.totalCalories = this.orders[0].calorie * this.orders[0].quantity;
      }
      this.totalCalories.toFixed(2)
    }, (error: any) => {
      console.log(error)
    })
  }

  subtract(totalCalories:number, calorieIntake:number) {
    return calorieIntake - totalCalories
  }

  calculate(amount: number, quantity: number) {
    return amount * quantity
  }

  payment(amount: any) {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripeTextKey,
      locale: 'auto',
      token: async (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        this.stripToken = token;
        this.paymentDone()
      },
    });

    handler.open({
      name: 'Sales-Point',
      description: 'Checkout',
      amount: amount * 100,
      currency: 'gbp'
    });

  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: environment.stripeTextKey,
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }

  paymentDone() {
    for (let i = 0; i < this.carts.length; i++) {
      this.order[i] = new OrderConfig();
      this.order[i].menu = this.carts[i].menu._id;
      this.order[i].quantity = this.carts[i].quantity;
      this.order[i].shop = this.carts[i].menu.shop._id;
      this.order[i].total = this.carts[i].amount * this.carts[i].quantity;
      this.order[i].address = this.address
      this.order[i].paymentMethod = this.stripToken.type;

      this.orderService.createOrder(this.order[i]).subscribe((data) => {
        console.log(data.msg)
        this.isCheckout = true;
        this.getOrdersByUserfind();
      }, err => {
        console.log(err)
      })

      this.cartService.removeCart(this.carts[i]._id).subscribe((data) => {
        console.log(data.msg)
        this.getCartsByUser()
      }, err => {
        console.log(err)
      })
    }
    console.log(this.order)
  }
}
