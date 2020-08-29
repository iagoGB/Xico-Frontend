import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-susbcribe',
  templateUrl: './susbcribe.component.html',
  styleUrls: ['./susbcribe.component.sass']
})
export class SusbcribeComponent implements OnInit {
  @Input() title: string = 'CADASTRO';
  divHeight: number;
  divWidth: number;
  form: FormGroup;
  image: File;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const reference = document.getElementById('divForm');
    this.divHeight = reference.offsetHeight;
    this.divWidth = reference.offsetWidth;

    this.form = new FormGroup ({
      name: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      email: new FormControl(null,[ Validators.required,Validators.email ]),
      entryDate: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      confirm_password: new FormControl(null,Validators.required)
    })
  }

  onChange($event){
    this.image = $event.target.files[0];
    console.log('this.image: '+ this.image);
  }

  onSubmit(){
    console.log('submit' +  JSON.stringify( this.form.value));
    this.userService.save(this.form.value, this.image).subscribe((resp) => {
      console.log('Works!');
    },err => console.log('Doesn\'t work!', err));
  }

}
