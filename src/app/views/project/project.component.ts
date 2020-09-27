import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TagModel } from 'ngx-chips/core/accessor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { toolsOptions } from 'src/app/utils/utils';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  projetoForm: FormGroup;
  imageList: Array<any> = [];
  showToolsResult: boolean = false;
  toolsOptions:any[] = toolsOptions; 

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
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
      likes: new FormControl(0),
      views: new FormControl(0),
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
    if (this.imageList.length === 0) {
      this.toastr.warning('Você deve selecionar pelo menos uma imagem!');
      return;
    }
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

  public onAdding(tag: TagModel): Observable<TagModel>{
    const hashtag = '#'
    if (!tag.startsWith(hashtag)){
      tag = hashtag.concat(tag.toString());
    }
    return of(tag);
  }
}
