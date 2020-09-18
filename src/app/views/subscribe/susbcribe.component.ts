import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';


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
    private userService: UserService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
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
      imgTag.style.width = '86%'
      imgTag.style.padding = '5px';
      imgTag.src = reader.result.toString();
    }
  }

  onSubmit(){
    this.submitted = true;
    const form = this.form.value;
    if (!this.image) {
      this.setErrorMessage('Por favor selecione uma imagem');
      return;
    }

    if (form.email != form.confirm_email){
      this.setErrorMessage('Emails digitados estão diferentes');
      return;
    }

    if (form.password != form.confirm_password){
      this.setErrorMessage('Senhas incompatíveis');
      return;
    }
    if (!this.form.valid){
      return
    }

    this.saveUser(form);
    
  }

  saveUser(form:any){
    this.spinner.show();
    this.userService.save(this.form.value, this.image).subscribe((resp) => {
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
