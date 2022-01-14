import { Category } from "./category";
import { Ingredient } from "./ingredient";
import { Shop } from "./shop";
import { User } from "./user";

export class Assest{
  type!: string;
  URL!: string;
  name!: string;
  fieldName!: string;
  default!: boolean;
}
export class Menu {
  _id!: string;
  user!: User;
  shop!: Shop;
  name!: String;
  description!: String;
  currency!: String;
  // ingredient!: Ingredient;
  ingredients!: any[];
  category!: Category;
  price!: number;
  status!: string;
  image!: Assest
}

