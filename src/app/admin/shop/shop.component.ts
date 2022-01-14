import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shops: Shop[] = [];
  shop!: Shop;
  isView: Boolean = false;
  itemPerPage = 10;
  paginationConfig:any = {};
  constructor(
    private shopService: ShopService, private router: Router,
  ) { }

  ngOnInit(): void {
    this.getShops();
    this.paginationConfig = {
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItem: this.shops ? this.shops.length : 0
    }
  }

  pageChanged(event: any){
    this.paginationConfig.currentPage = event;
  }

  getShops() {
    this.shopService.getShops().subscribe((data:any) => {
      this.shops = data.data
      console.log(this.shops)
    }, (error: any) => {
      console.log(error)
    })
  }

  deleteShop(id: any){
    this.shopService.deleteShop(id).subscribe((data:any) => {
      console.log(data.msg)
      this.getShops()
    }, (error: any) => {
      console.log(error);
    })
  }

  onView(id: any) {
    this.shopService.getShopById(id).subscribe((data: any) => {
      this.shop = data.data;
      console.log(this.shop)
    }, (error: any) => {
      console.log(error)
    })
  }

  viewShop(id: any) {
    this.router.navigate(['/admin/shop-detail', id])
  }
}
