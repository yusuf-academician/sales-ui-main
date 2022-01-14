import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  itemPerPage = 5;
  paginationConfig:any = {};
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrdersByUser()
    this.paginationConfig = {
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItem: this.orders ? this.orders.length : 0
    }
  }

  pageChanged(event: any){
    this.paginationConfig.currentPage = event;
  }

  getOrdersByUser(){
    this.orderService.getOrdersByUser().subscribe((data) => {
      console.log(data)
      this.orders = data.data
    }, error => {
      console.log(error);
    })
  }
}
