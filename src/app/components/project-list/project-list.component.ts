import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass']
})
export class ProjectListComponent implements OnInit {
  @Input() list: Array<any>;
  @Input() create: boolean = false

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  createProject() {
    this.router.navigate(['novo-projeto']);
  }

  viewProject(id: number) {
    this.router.navigate([ 'portfolio',id ]);
  }

}