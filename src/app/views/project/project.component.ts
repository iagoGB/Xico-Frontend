import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { TagModel } from 'ngx-chips/core/accessor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';
import { toolsOptions } from 'src/app/utils/utils';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  title: string = 'NOVO PROJETO';
  editing: boolean = false;
  projetoForm: FormGroup;
  imageList: Array<any> = [];
  showToolsResult: boolean = false;
  toolsOptions:any[] = toolsOptions; 
  modalRef: BsModalRef;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: BsModalService,
    private portfolioService: PortfolioService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.projetoForm = new FormGroup({
      id: new FormControl(null),
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

    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.spinnerService.show();
        this.setProjectForm(params['id']);
        this.title = 'EDITAR PROJETO';
        this.editing = true;
      }
    })
    
  }

  setProjectForm(arg0: any) {
    this.portfolioService.findByID(arg0).subscribe((data:any) => {
      this.projetoForm.patchValue({
        id: data.id,
        category: data.category,
        userID: data.userID,
        title: data.title,
        description: data.description,
        date: data.date,
        likes: data.likes,
        views: data.views,
        tags: data.tags,
        tools: data.tools.map(e => this.userService.convertToTools(e)),
        files: data.files
      });
      this.spinnerService.hide();
    })
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
        this.toastr.success('Novo projeto publicado!');
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

  removeFromForm(index: number){
    const fileImages = this.projetoForm.get('files').value as Array<any>;
    fileImages.splice(index,1);
  }

  removeImage(index: number){
    this.imageList.splice(index,1);
  }

  updateProject(){
    const fileImages = this.projetoForm.get('files').value as Array<any>;
    if (this.imageList.length === 0 && fileImages.length === 0) {
      this.toastr.warning('Você deve selecionar pelo menos uma imagem!');
      return;
    }
      
    this.spinnerService.show();
    this.portfolioService.updateProject(this.imageList, this.projetoForm.value).subscribe(
      (data) => {
        this.spinnerService.hide();
        this.location.back();
        this.toastr.success('Projeto atualizado!');
  
    }, err => {
      this.spinnerService.hide();
      this.toastr.error('Ocorreu um erro ao tentar atualizar, tente novamente');
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered'
    });
  }

  handler(type: string, $event: ModalDirective){
    setTimeout(() => {
      this.modalRef.hide();
    }, 2000);
  }

  deleteProject(){
    const portfolioID = this.projetoForm.get('id').value;
    this.portfolioService.delete(portfolioID).subscribe((success) => {
      this.modalRef.hide();
      document.getElementById('show-success').click();
      this.location.back(); 
    });
  }
}
