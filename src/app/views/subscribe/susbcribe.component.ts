import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-susbcribe',
  templateUrl: './susbcribe.component.html',
  styleUrls: ['./susbcribe.component.sass']
})
export class SusbcribeComponent implements OnInit {
  form: FormGroup;
  image: File = null;
  erromsg: string = null;
  submitted: boolean;

  constructor(
    private router: Router,
    private alert: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private spinner: NgxSpinnerService, 
  ) { }

  ngOnInit() {

    this.form = new FormGroup ({
      name: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      nickname: new FormControl(null,Validators.required),
      email: new FormControl(null,[ Validators.required,Validators.email ]),
      confirm_email: new FormControl(null,[ Validators.required,Validators.email ]),
      entryDate: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      confirm_password: new FormControl(null,Validators.required)
    })
  }

  get f(){
    return this.form.controls;
  }

  getFile(){
    document.getElementById('imagem').click();
  }

  onChange($event){
    this.image = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.image);
    const imgTag =  document.getElementsByTagName('img')[1];
    reader.onload = (_event) => { 
      imgTag.style.width = '259px';
      imgTag.style.height = '309px';
      imgTag.style.marginTop = '10px';
      imgTag.style.padding = '5px';
      imgTag.style.objectFit = 'cover';
      imgTag.src = reader.result.toString();
    }
  }

  onSubmit(){
    this.submitted = true;
    const form = this.form.value;
    if (!this.image) {
      this.alert.warning('Por favor, selecione uma imagem para o seu perfil');
      return;
    }

    if (form.email != form.confirm_email){
      this.alert.warning('Emails digitados estão diferentes');
      return;
    }

    if (form.password != form.confirm_password){
      this.alert.warning('Senhas incompatíveis');
      return;
    }
    if (!this.form.valid){
      return;
    }

    this.saveUser(form);
    
  }

  saveUser(form:any){
    this.spinner.show();
    this.userService.save(this.form.value, this.image).subscribe((resp) => {
      this.alert.success(`Conta criada! Seja bem vindo(a) ${form.name} !`);
      this.automaticLogin({ email:form.email, password: form.password });
    },
    err => console.log('Doesn\'t work!', err));
  }

  automaticLogin(form: any) {
   this.authService.login(form).subscribe((resp) => {
      this.authService.autenthicate(resp);
      this.router.navigate(['/']);
      this.spinner.hide();
    });
  }

  setErrorMessage(txt: string){
    this.erromsg = txt;
  }

}
