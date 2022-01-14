import { Menu } from "./menu";
import { User } from "./user"

export class Cart{
  _id!: string;
  user!: User;
  menu!: Menu;
  quantity!: number;
  amount!: number;
}

