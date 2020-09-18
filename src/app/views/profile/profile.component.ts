import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public user: User = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    })
  }
  getUserDetails(id: number) {
    this.userService.getUser(id).subscribe((resp:User) => {
      this.user = resp;
      // this.user.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, quis fuga! Aspernatur et accusantium esse dicta beatae eius aut debitis laborum recusandae! Labore sequi eum unde facilis eaque sapiente magni? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium alias iure commodi beatae magni pariatur explicabo sit illum cupiditate. A inventore reiciendis reprehenderit blanditiis temporibus adipisci magni, fugiat alias repellat!";
      this.user.tools = [
        // { name:'Figma',url: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/figma.svg'},
        // { name:'Reaper',url: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/reaper.svg'},
        // { name:'Github',url: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/github.svg'},
        // { name:'Reaper2',url: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/reaper.svg'},
        // { name:'Reaper2',url: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/reaper.svg'},
        // 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/lightroom.svg',
        // 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/figma.svg',
        // 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/figma.svg',
        // 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/figma.svg',
        // 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/figma.svg',
        // 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/figma.svg',
      ]
      this.spinnerService.hide();
    },(err) => {})
  }

  isOwner(){
    return this.authService.isLoggedIn() && this.authService.getData().id === this.user.id;
  }
}
