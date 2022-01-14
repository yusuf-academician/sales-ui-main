import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,){}

  ngOnInit(): void {}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
