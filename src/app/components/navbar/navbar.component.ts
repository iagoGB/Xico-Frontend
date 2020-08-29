import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  @Input() title: string = 'CADASTRO';
  divHeight: number;
  divWidth: number;
  form: FormGroup;
  image: File;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
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

  openDialog(modal:string, div: string){
    const reference = document.getElementById(div);
    setTimeout(() => {
      this.divHeight = reference.offsetHeight;
      this.divWidth = reference.offsetWidth;
      console.log('Ao abrir dialog' + this.divHeight,this.divWidth)
    }, 100);
    
    const modal_t  = document.getElementById(modal)
    modal_t.classList.remove('hidden')
    modal_t.classList.add('show');
  }
  
  closeDialog() {
    const modal_t  = document.getElementById('modal_1')
    modal_t.classList.remove('show')
    modal_t.classList.add('hidden');
  }

}
