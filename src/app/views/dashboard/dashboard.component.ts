import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';
import { toolsOptions } from 'src/app/utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public list: any[];
  private previousID: number = 0;
  public searchLabel: string = null;
  public toolsOptions:any[] = toolsOptions;
  public selectedTool: any;
  public moreOptions: any[] = [
    { display: "Mais recentes", value:"recents" },
    { display: "Mais vizualizados", value:"views" },
    { display: "Mais avaliados", value:"likes" }
  ];
  public selectedMore: any;
  public selectedTitle: any;
  
  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private spinnerService: NgxSpinnerService,
    private userService: UserService
  ) { }

  ngOnInit()  {
    this.spinnerService.show();
    this.observeRouterParams();
  }

  findAll(){
    this.portfolioService.findAll().subscribe(
      (success:any[]) => {
        this.list = success.reverse();
        this.list.forEach(e => this.getUserName(e.userID));
        this.spinnerService.hide();
      },
      (err) => {}
    );
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

  observeRouterParams() {
    this.route.params.subscribe((params) => {
      let tag = params['tag'] as string;
      console.log('tag: '+ tag);
      if (tag != undefined){
        this.spinnerService.show();
        this.portfolioService.findByTag(tag).subscribe((data) => {
          this.searchLabel= `Tag: ${ tag }`;
          this.list = data;
          this.list.forEach(e => this.getUserName(e.userID));
          this.spinnerService.hide();
        })
      } else {
        this.findAll();
      }
    });
  }

  onChangeTool(value: any){
    this.spinnerService.show();
    this.portfolioService.findByTool(value.value).subscribe((data) =>{
      const tool = toolsOptions.find(e => e.value === value.value);
      this.searchLabel= `Ferramenta: ${ tool.display }`;
      this.list = data;
      this.list.forEach(e => this.getUserName(e.userID));
      this.spinnerService.hide();
    })
  }

  onChangeMoreSearch(value: any){
    console.log('chegou: '+JSON.stringify(value));
    this.spinnerService.show();
    this.portfolioService.findByMore(value.value).subscribe((data) =>{
      const tool = toolsOptions.find(e => e.value === value);
      if (value.value === "views")
        this.searchLabel =  "Mais vizualizados";
      else if (value.value === "likes")
        this.searchLabel =  "Mais avaliados";
      else 
        this.searchLabel =  "Mais recentes";

      this.list = data;
      this.list.forEach(e => this.getUserName(e.userID));
      this.spinnerService.hide();
    })
  }

  searchByTitle(){
    this.spinnerService.show();
    this.portfolioService.findByTitle(this.selectedTitle).subscribe((data) => {
      this.list = data;
      this.list.forEach(e => this.getUserName(e.userID));
      this.spinnerService.hide();
    })
  }

}
