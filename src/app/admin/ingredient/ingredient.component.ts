import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/model/ingredient';
import { CategoryService } from 'src/app/services/category/category.service';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  ingredients: Ingredient[] = [];
  ingredientForm!: FormGroup;
  submit = false;
  ingredient!: Ingredient;
  isCreate: Boolean = true;
  itemPerPage = 5;
  paginationConfig:any = {};
  constructor( private ingredientService: IngredientService,
    private _formBuilder:FormBuilder, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getIngredientsByAdmin();
    this.createForm();
    this.paginationConfig = {
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItem: this.ingredients ? this.ingredients.length : 0
    }
  }

  pageChanged(event: any){
    this.paginationConfig.currentPage = event;
  }

  createForm(){
    this.ingredientForm = this._formBuilder.group({
      ingredient: ['', Validators.required]
    })
  }

  get f(){
    return this.ingredientForm.controls;
  }

  getIngredientsByAdmin(){
    this.ingredientService.getIngredientsByAdmin().subscribe((data: { data: Ingredient[]; }) => {
      this.ingredients = data.data
      console.log(this.ingredients)
    },(error: any) => {
      console.log(error)
    })
  }

  getIngredient(id: any){
    this.isCreate = false;
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
    this.ingredientService.getIngredient(id).subscribe((data: { data: Ingredient; }) => {
      this.ingredient = data.data
      this.ingredientForm.patchValue(this.ingredient);
      console.log(this.ingredient)
    },(error: any) => {
      console.log(error)
    })
  }

  addIngredient(){
    this.isCreate = true;
    this.ingredientForm.reset();
    const element = document.getElementById('edit');
    if(element){
      element.style.display = 'block'
    }
  }

  onSubmit(){
    this.submit = true;
    if(this.ingredientForm.invalid){
      return;
    }
    this.ingredientService.createIngredient(this.ingredientForm.value).subscribe((data: { msg: any; }) => {
      console.log(data.msg)
      this.getIngredientsByAdmin();
      this.ingredientForm.reset();
      Object.keys(this.ingredientForm.controls).forEach(key => {
        this.ingredientForm.get(key)?.setErrors(null) ;
      });
      const element = document.getElementById('edit');
      if(element){
        element.style.display = 'none'
      }
    },(error: any) => {
      console.log(error)
    })
  }

  onEdit(){
    this.submit = true;
    if(this.ingredientForm.invalid){
      return;
    }
    this.ingredientService.updateIngredient(this.ingredient._id, this.ingredientForm.value).subscribe((data: { msg: any; }) => {
      console.log(data.msg)
      this.getIngredientsByAdmin();
      this.ingredientForm.reset();
      Object.keys(this.ingredientForm.controls).forEach(key => {
        this.ingredientForm.get(key)?.setErrors(null) ;
      });
      const element = document.getElementById('edit');
      if(element){
        element.style.display = 'none'
      }
    },(error: any) => {
      console.log(error)
    })
  }


  deleteIngredient(id: any){
    this.ingredientService.deleteIngredient(id).subscribe((data: { msg: any; }) => {
      console.log(data.msg)
      this.getIngredientsByAdmin()
    })
  }
}
