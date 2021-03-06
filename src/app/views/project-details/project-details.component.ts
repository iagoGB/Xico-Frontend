import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lightbox } from 'ngx-lightbox';
import { AuthService } from 'src/app/services/auth.service';

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
  loadedImages: number = 0;
  subscription: any = null;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private lightBox: Lightbox,
    private userService: UserService,
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private spinnerService: NgxSpinnerService
    
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.loadRoute(); 
  }
  
  loadRoute() {
    this.subscription = this.route.params;
    this.subscription.subscribe(
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
        this.increaseViews(); 
      },
      (err) =>{
        console.log('Ocorreu um erro ao trazer as informações do usuário');
      }
    )
  }

  increaseViews() {

    if (this.authService.getData()?.id === this.user.id){
      // Não faz nada, não pode aumentar suas próprias views
    } else {

      this.portfolioService.increaseViews(this.portfolio.id).subscribe((success) => {
        // do nothing
      });
      
    }
  }

  updateLike(){
    this.portfolioService.updateLike(this.portfolio.id).subscribe((success) => {
      if (this.isLiked()){
        this.portfolio.tanners = this.portfolio.tanners.filter(e => e != this.authService.getData()?.id);
      }else {
        this.portfolio.tanners.push(this.authService.getData()?.id);
      }
    })
  }

  close(){
    this.location.back();
  }

  open(index: number){
    this.lightBox.open(this.portfolio.files,index, { centerVertically: false });
  }

  print(){
    this.loadedImages +=1;
    if (this.loadedImages === this.portfolio.files.length){
      document.getElementById('hid').hidden = false;
      this.spinnerService.hide();
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  isLiked(){
    const viewUserID = this.authService.getData()?.id;
    const value = this.portfolio.tanners.find(l => l === viewUserID)
    return  value? true : false
  }

  isOwner(){
    return this.authService.getData()?.id === this.user.id;
  }
  
  isLogged(){
    return this.authService.isLoggedIn();
  }

  searchByTag(tag: any){
    this.router.navigate(['tag',tag]);
  }
}
