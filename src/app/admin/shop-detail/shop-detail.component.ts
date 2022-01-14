import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/services/shop/shop.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {

  shop!: Shop;
  download = faDownload
  logo!: any;
  shopId: any
  constructor(
    private actRouter: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.shopId = this.actRouter.snapshot.params['shopId'];
    console.log(this.shopId);
    this.getShopById(this.shopId)
  }

  getShopById(shopId: any){
    this.shopService.getShopById(shopId).subscribe((data) => {
      this.shop = data.data;
      console.log(this.shop);
      this.shop.certificates.map((data) => {
        if(data.type === 'logo'){
          this.logo = data
        }
      })
    }, error => {
      console.log(error);
    })
  }

  onApprove() {
    let body = {
      approvalStatus: true
    }

    this.shopService.approveShop(this.shopId, body).subscribe((data: any) => {
      console.log(data.msg)
      this.router.navigate(['/admin/shop']);
    },(error: any) => {
      console.log(error)
    })
  }

  deleteShop(){
    this.shopService.deleteShop(this.shopId).subscribe((data:any) => {
      console.log(data.msg);
      this.router.navigate(['/admin/shop']);
    }, (error: any) => {
      console.log(error);
    })
  }
}
