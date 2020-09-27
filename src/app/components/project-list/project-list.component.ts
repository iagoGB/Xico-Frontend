import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass']
})
export class ProjectListComponent implements OnInit {
  @Input() list: Array<any>;
  @Input() create: boolean = false
  @Input() searchLabel: string = null;
  @Input() userDetails: boolean = false
  size: number = 0;
  loaded: number = 0;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.size = this.list.length;
    
    if (this.size == 0) 
      this.spinner.hide();

  }


  createProject() {
    this.router.navigate(['novo-projeto']);
  }

  viewProject(id: number) {
    this.router.navigate([ 'portfolio',id ]);
  }

  onLoad(){
    this.loaded +=1;
    if ( this.loaded === this.size)
      this.spinner.hide();
  }

  goToProfile(id: number){
    this.router.navigate(['perfil', id]);
  }

  editProject(project: any) {
    this.router.navigate(['editar-projeto',project.id]);
  }

  getCurrentRoute(){
    return this.activatedRoute.component['name'] === "DashboardComponent";
  }

  isOwner(project){
    return this.authService.getData()?.id === project.userID;
  }

}
