import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  list: any[];

  constructor(
    private portfolioService: PortfolioService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit()  {
    this.spinnerService.show()
    this.portfolioService.findAll().subscribe(
      (success:any[]) => {
        this.list = success.reverse();
        this.spinnerService.hide();
      },
      (err) => {
        console.log('deu erro' + err);
      }
    )
  }

}
