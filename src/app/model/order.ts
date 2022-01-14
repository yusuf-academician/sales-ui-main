import { Menu } from "./menu";
import { Shop } from "./shop";
import { User } from "./user";

export class Order{
  _id!: string;
  shop!: Shop;
  menu!: Menu;
  user!: User;
  address!: String;
  paymentMethod!: String;
  quantity!: number;
  calorie!: number;
  calorieUnit!: String;
  orderId!: String;
  total!: number;
  currency!: number;
  status!:String;
  createdAt!: Date;
  updatedAt!: Date;
}


export class OrderConfig{
  shop!: String;
  menu!: string;
  quantity!: number;
  total!: number;
  address!: String;
  paymentMethod!: String;
}
