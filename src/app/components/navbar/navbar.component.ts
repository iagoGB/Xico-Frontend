import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  userPicture: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(){
  }

  logout(){
    this.authService.logout();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getUserID(){
    return this.authService.getData().id;
  }
  getUserPicture(){
    const userID = this.getUserID();
    console.log(userID);
    return this.userService.getUser(userID).subscribe((resp: any) => {
      this.userPicture = resp.image;
    })
  }

  goToProfile(){
    this.router.navigate(['perfil',this.getUserID()]);
  }  
}
