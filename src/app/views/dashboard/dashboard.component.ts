import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  list: any[];

  constructor(
    private portfolioService: PortfolioService
  ) { }

  ngOnInit()  {
    this.portfolioService.findAll().subscribe(
      (success:any[]) => {
        this.list = success.reverse();
      },
      (err) => {
        console.log('deu erro' + err);
      }
    )
  }

}
