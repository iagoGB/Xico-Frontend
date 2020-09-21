import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  projetoForm: FormGroup;
  imageList: Array<any> = [];
  showToolsResult: boolean = false;
  public toolsOptions: Array<any> = [
    { display:'Figma', value: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/figma.svg'},
    { display:'Reaper', value: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/reaper.svg'},
    { display:'Photoshop', value: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/photshop.svg'},
    { display:'LightRoom', value: 'https://xicoportfolio.s3.us-east-2.amazonaws.com/tools/lightroom.svg'}
  ]

  constructor(
    private authService: AuthService,
    private location: Location,
    private portfolioService: PortfolioService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.projetoForm = new FormGroup({
      category: new FormControl('DESIGN', Validators.required),
      userID: new FormControl(this.authService.getData().id, Validators.required),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
      tags: new FormControl(null),
      tools: new FormControl([], Validators.required),
      files: new FormControl([])
    });
    
  }

  getImages() {
    document.getElementById('images').click();
  }

  loadImages($event) {
    if ($event.target.files.length > 0) {
      const files = $event.target.files as FileList;
      for (let index = 0; index < files.length; index++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[index]);
        reader.onload = (event) => {
          this.imageList.push({ file: files[index], src: reader.result.toString() })
        }
      }
    }
  }

  hidden(){
    const tools = this.projetoForm.get('tools').value as Array<any>;
    if (tools.length === 0) {

      return 
    }
    document.getElementById('tools').hidden = true;
    this.showToolsResult = true;
  }
  show(){
    document.getElementById('tools').hidden = false;
    this.showToolsResult = false;
  }
  print($event = 'texto'){
  }

  createProject(){
    this.spinnerService.show();
    this.portfolioService.save(this.imageList,this.projetoForm.value).subscribe(
      (success) => {
        this.location.back();
        this.spinnerService.hide();
      },
      (err) => {
        console.log('Deu erro!' + err);
      }
    )
  }
}
