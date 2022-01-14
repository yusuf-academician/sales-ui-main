import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Shop } from 'src/app/model/shop';
import { OrderService } from 'src/app/services/order/order.service';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  shops: Shop[] = [];
  itemPerPage = 5;
  paginationConfig:any = {};
  constructor(private orderService: OrderService, private shopService: ShopService) { }

  ngOnInit(): void {
    this.getShopsByUser();
    this.paginationConfig = {
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItem: this.orders ? this.orders.length : 0
    }
  }

  pageChanged(event: any){
    this.paginationConfig.currentPage = event;
  }

  getOrdersByShop(id: any){
    this.orderService.getOrdersByShop(id).subscribe((data) => {
      this.orders = data.data
      console.log(this.orders);
    }, error => {
      console.log(error);
    })
  }

  getShopsByUser(){
    this.shopService.getShopsByUser().subscribe((data) => {
      this.shops = data.data;
      this.getOrdersByShop(this.shops[0]?._id)
      console.log(this.shops);
    }, error => {
      console.log(error);
    })
  }

  approveOrder(orderId: any){
    let body = {
      status: 'Approved'
    }

    this.orderService.approveOrder(orderId, body).subscribe((data) => {
      console.log(data.msg)
      this.getOrdersByShop(this.shops[0]?._id)
    }, error => {
      console.log(error);
    })
  }

  cancelOrder(orderId: any){
    let body = {
      status: 'Shop-Cancel'
    }

    console.log(orderId)
    this.orderService.cancelOrder(orderId, body).subscribe((data) => {
      console.log(data.msg)
      this.getOrdersByShop(this.shops[0]?._id)
    }, error => {
      console.log(error);
    })
  }

  change(shop: Shop){
    this.getOrdersByShop(shop._id)
  }
}
