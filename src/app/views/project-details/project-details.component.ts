import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.sass']
})
export class ProjectDetailsComponent implements OnInit {
  portfolio: any;
  user: any;
  itemsPerSlide: number = null;
  singleSlideOffset = true;
  noWrap = false;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private lightBox: Lightbox,
    private portfolioService: PortfolioService,
    private spinnerService: NgxSpinnerService
    
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.route.params.subscribe(
      (params) => {
        this.loadProject(params['id']);
      },
      (err) =>{}
    );
  }

  loadProject( id: number ){
    this.portfolioService.findByID(id).subscribe(
      (resp) => {
        this.portfolio = resp;
        this.convertImages();
        const tamanhoDoArray = this.portfolio.files.length;
        if (tamanhoDoArray === 1){
          this.itemsPerSlide = 1;
        } else if (tamanhoDoArray === 2){
          this.itemsPerSlide = 2;
        } else if (tamanhoDoArray === 3){
          this.itemsPerSlide = 3;
        } else if (tamanhoDoArray === 4){
          this.itemsPerSlide = 4;
        } else {
          this.itemsPerSlide = 5;
        }
        this.getUserDetails(this.portfolio.userID);
      },
      (err) => {
        console.log('Ocorreu um erro ao trazer o projeto');
      }
    )
  }
  convertImages() {
    let list = this.portfolio.files as Array<any>;
    this.portfolio.files = list.map((e) => { 
      return { src: e } 
    });
  }

  getUserDetails(userID: number) {
    this.userService.getUser(userID).subscribe(
      (resp) => {
        this.user = resp;
        this.spinnerService.hide();
      },
      (err) =>{
        console.log('Ocorreu um erro ao trazer as informações do usuário');
      }
    )
  }

  close(){
    this.location.back();
  }

  open(index: number){
    this.lightBox.open(this.portfolio.files,index, { centerVertically: false });
  }
}
