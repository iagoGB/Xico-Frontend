import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-susbcribe',
  templateUrl: './susbcribe.component.html',
  styleUrls: ['./susbcribe.component.sass']
})
export class SusbcribeComponent implements OnInit {
  form: FormGroup;
  image: File = null;
  erromsg: string = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    this.form = new FormGroup ({
      name: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      nickname: new FormControl(null,Validators.required),
      email: new FormControl(null,[ Validators.required,Validators.email ]),
      entryDate: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      confirm_password: new FormControl(null,Validators.required)
    })
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
    if (!this.image) {
      this.erromsg = "Por favor selecione uma imagem";
      return;
    }
    this.userService.save(this.form.value, this.image).subscribe((resp) => {
      this.router.navigate(['/']);
    },err => console.log('Doesn\'t work!', err));
  }

}
