import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass']
})
export class ProjectListComponent implements OnInit {
  @Input() list: Array<any>;

  constructor(
    private router: Router
  ) { }

  ngOnInit()  {
  }

  createProject(){
    this.router.navigate(['projeto']);
  }

}
