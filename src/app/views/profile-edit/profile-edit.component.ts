import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { toolsOptions } from 'src/app/utils/utils';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.sass']
})
export class ProfileEditComponent implements OnInit {
  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;
  public userImg: string = null; 
  public user: User =  null;
  public userForm: FormGroup;
  public toolsOptions = toolsOptions;
  public imageFile: File;
  modalRef: BsModalRef;

  constructor(

    private spinner: NgxSpinnerService,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private location: Location
    
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.userForm = new FormGroup ({
      id: new FormControl(null),
      name: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      nickname: new FormControl(null,Validators.required),
      image: new FormControl(null,Validators.required),
      email: new FormControl(null,[ Validators.required,Validators.email]),
      entryDate: new FormControl(null,Validators.required),
      description: new FormControl(null),
      interests: new FormControl(null),
      tools: new FormControl(null),
      fb:  new FormControl(null),
      ig:  new FormControl(null),
      
    });

    this.route.params.subscribe((params)=> {
      this.loadUserData(params['id']);
    });
  }

  loadUserData(id: number) {
    this.userService.getUser(id).subscribe((data: any) => {
      this.userImg = data.image;
      this.userForm.patchValue({
        id: data.id,
        name: data.name,
        image: data.image,
        lastName: data.lastName,
        nickname: data.nickname,
        entryDate: data.entryDate,
        description: data.description,
        tools: data.tools.map(e => this.convertToTools(e)),
        email: data.email,
        ig: data.ig,
        fb: data.fb
      });
      this.spinner.hide();
    });
  }

  convertToTools(tool){
    switch (this.getTool(tool)) {
      case 'figma.svg':
        return toolsOptions[0];
      
      case 'reaper.svg':
        return toolsOptions[1];

      case 'photshop.svg':
        return  toolsOptions[2];

      case 'lightroom.svg':
        return toolsOptions[3];
    
      default:
        console.log('');
      break;
    }
  }

  getTool(tool: string) {
    const value = tool.split('tools/')[1];
    return value;
  }

  onChange($event){
    this.imageFile = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    const imgTag =  document.getElementsByTagName('img')[1];
    reader.onload = (_event) => {
      imgTag.src = reader.result.toString();
    }
  }

  update(){
    if (this.userForm.invalid) {
      return;
    }
    this.spinner.show();
    this.userService.update(this.userForm.value,this.imageFile).subscribe((data) => {
      this.spinner.hide();
      this.location.back();
      this.toastr.success('Dados atualizados com sucesso!');
    },(err) => console.log(err))
  }

  deleteUser(){
    
    this.userService.delete(this.userForm.get('id').value).subscribe(( data ) => {
      this.modalRef.hide();
      document.getElementById("show-goodbye").click();
      this.authService.logout();
      this.router.navigate(['/']);
    })
  }

  openGetFile(){
    document.getElementById('image').click();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered'
    });
  }

  handler(type: string, $event: ModalDirective){
    setTimeout(() => {
      this.modalRef.hide();
    }, 5000);
  }

}
