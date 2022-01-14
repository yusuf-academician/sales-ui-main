import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  category!: Category;
  categoryForm!: FormGroup;
  submitCategory = false;
  isCreate: Boolean = true;
  itemPerPage = 10;
  paginationConfig:any = {};
  constructor( private categoryService: CategoryService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.getCategoriesByAdmin();
    this.paginationConfig = {
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItem: this.categories ? this.categories.length : 0
    }
  }

  createForm(){
    this.categoryForm = this._formBuilder.group({
      category: ['', Validators.required]
    })
  }

  pageChanged(event: any){
    this.paginationConfig.currentPage = event;
  }


  get z(){
    return this.categoryForm.controls;
  }

  getCategoriesByAdmin(){
    this.categoryService.getCategoriesByAdmin().subscribe((data: { data: Category[]; }) => {
      this.categories = data.data
      console.log(this.categories)
    },(error: any) => {
      console.log(error)
    })
  }

  addCategory(){
    this.isCreate = true;
    this.categoryForm.reset();
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
  }

  getCategory(id: any){
    this.isCreate = false;
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
    this.categoryService.getCategory(id).subscribe((data: { data: Category; }) => {
      this.category = data.data
      this.categoryForm.patchValue(this.category)
    },(error: any) => {
      console.log(error)
    })
  }

  createCategory(){
    this.submitCategory = true;
    console.log(this.categoryForm.controls)
    if(this.categoryForm.invalid){
      return;
    }
    this.categoryService.createCategory(this.categoryForm.value).subscribe((data: { msg: any; }) => {
      console.log(data.msg)
      this.getCategoriesByAdmin();
      this.categoryForm.reset();
      Object.keys(this.categoryForm.controls).forEach(key => {
        this.categoryForm.get(key)?.setErrors(null) ;
      });
      const element = document.getElementById('edit');
      if (element) {
        element.style.display = 'none';
      }
    },(error: any) => {
      console.log(error)
    })
  }

  updateCategory(){
    this.submitCategory = true;
    if(this.categoryForm.invalid){
      return;
    }
    this.categoryService.updateCategory(this.category._id, this.categoryForm.value).subscribe((data: { msg: any; }) => {
      console.log(data.msg)
      this.getCategoriesByAdmin();
      this.categoryForm.reset();
      Object.keys(this.categoryForm.controls).forEach(key => {
        this.categoryForm.get(key)?.setErrors(null) ;
      });
      const element = document.getElementById('edit');
      if (element) {
        element.style.display = 'none';
      }
    },(error: any) => {
      console.log(error)
    })
  }

  deleteCategory(id: any){
    this.categoryService.deleteCategory(id).subscribe((data: { msg: any; }) => {
      console.log(data.msg);
      this.getCategoriesByAdmin();
    })
  }
}
