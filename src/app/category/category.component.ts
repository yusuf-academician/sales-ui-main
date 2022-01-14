import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { CategoryMenu } from '../model/categoryMenu';
import { Menu } from '../model/menu';
import { CategoryService } from '../services/category/category.service';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  meuns: Menu[] = [];
  categoryMenus: any[] = []
  constructor(private categoryService: CategoryService, private router: Router,
    private menuService: MenuService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data.data)
      this.categories = data.data
      for (let i = 0; i < this.categories.length; i++) {
        this.categoryMenus[i] = new CategoryMenu()
        this.categoryMenus[i].category = this.categories[i]
        this.getMenusByCategory(this.categories[i]._id, i)
      }
    }, error => {
      console.log(error)
    })
  }

  getMenusByCategory(categoryId: any, i: number) {
    this.menuService.getMenuByCategory(categoryId).subscribe((data) => {
      this.categoryMenus[i].menus =  data.data
      console.log(this.categoryMenus[i])
    }, error => {
      console.log(error)
    })
  }

  openPage(url:any,menuId: any){
    this.router.navigate([url,menuId])
  }
}
