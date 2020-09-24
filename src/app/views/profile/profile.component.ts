import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public user: User = null;
  public loaded = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    //this.spinnerService.show();
    //this.spinnerService.show("teste");
    this.showSpinner('teste');
    this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    })
  }

  getUserDetails(id: number) {
    this.userService.getUser(id).subscribe((resp:User) => {
      this.user = resp;
      this.user.tools = this.user.tools.map(e => this.userService.convertToTools(e));
      this.spinnerService.hide('teste');
      this.loaded = true;
    }, err => console.log(err))
  }

  isOwner(){
    return this.authService.isLoggedIn() && this.authService.getData().id === this.user.id;
  }

  hide(){
  }

  openLink(url: string){
    window.open(url, "_blank");
  }

  showSpinner(name: string){
    this.spinnerService.show(name).then((value) =>{
      console.log(value);
    })
  }
}
