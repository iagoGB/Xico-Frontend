import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public list: any[];
  private previousID: number = 0;

  constructor(
    private portfolioService: PortfolioService,
    private spinnerService: NgxSpinnerService,
    private userService: UserService
  ) { }

  ngOnInit()  {
    this.spinnerService.show();
    this.portfolioService.findAll().subscribe(
      (success:any[]) => {
        this.list = success.reverse();
        this.list.forEach(e => this.getUserName(e.userID));
        this.spinnerService.hide();
      },
      (err) => {}
    )
  }

  getUserName(userID: number): any {

    if (userID === this.previousID)
      return;
    this.previousID = userID;

   

    this.userService.getUser(userID).subscribe((data: any) => {
      let allWithID = this.list.filter(e => e.userID === userID);
      allWithID.forEach(e => e.userDetails = { id: data.id, image: data.image, nickname: data.nickname });
    });
  }

}
