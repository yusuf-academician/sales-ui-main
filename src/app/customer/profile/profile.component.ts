import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!:User
  constructor(private userService: UserService,
    private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data.data
      console.log(this.user)
    },error => {
      console.log(error)
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
