import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.sass']
})
export class ProjectDetailsComponent implements OnInit {
  portfolio: any;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private portfolioService: PortfolioService
    
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.loadProject(params['id']),
      (err) =>{}
    );
  }

  loadProject( id: number ){
    this.portfolioService.findByID(id).subscribe(
      (resp) => {
        this.portfolio = resp;
        this.portfolio.tags = ['#fofoca', '#desenho', '#design', '#luluzinha', '#animacao'];
        console.log(this.portfolio);
        this.getUserDetails(this.portfolio.userID);
      },
      (err) => {
        console.log('Ocorreu um erro ao trazer o projeto');
      }
    )
  }

  getUserDetails(userID: number) {
    this.userService.getUser(userID).subscribe(
      (resp) => {
        this.user = resp;
        this.user.tools = [
        { name:'Figma',url: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/figma.svg'},
        { name:'Reaper',url: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/reaper.svg'}
      ]
        console.log(this.user)
      },
      (err) =>{
        console.log('Ocorreu um erro ao trazer as informações do usuário');
      }
    )
  }

}
