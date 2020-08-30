import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  loginForm: FormGroup;
  userPicture: string;
  image: File;

  constructor(
    private router: Router,
    private authService: AuthService,
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

    this.loginForm = new FormGroup({
      email: new FormControl(null,[ Validators.required,Validators.email ]),
      password: new FormControl(null,Validators.required)
    })

  }

  getFile(){
    document.getElementById('imagem').click();
  }

  onChange($event){
    this.image = $event.target.files[0];
    console.log('this.image: '+ this.image);
  }

  onSubmit(){
    this.userService.save(this.form.value, this.image).subscribe((resp) => {
      this.closeDialog('modal_1');
    },err => {});
  }

  onLogin(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((resp) => {
      this.authService.autenthicate(resp);
      this.getUserPicture();
      this.closeDialog('modal_2');
    })
  }

  logout(){
    this.authService.logout();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getUserID(){
    return this.authService.getData().id;
  }
  getUserPicture(){
    const userID = this.getUserID();
    console.log(userID);
    return this.userService.getUser(userID).subscribe((resp: any) => {
      this.userPicture = resp.image;
    })
  }

  getH(div){
    const reference = document.getElementById(div);
    return reference.offsetHeight;
  }

  getW(div){
    const reference = document.getElementById(div);
    return reference.offsetWidth;
  }
  
  openDialog(modal:string){
    const modal_t  = document.getElementById(modal)
    modal_t.classList.remove('hidden')
    modal_t.classList.add('show');
  }
  
  closeDialog(id:string) {
    const modal_t  = document.getElementById(id);
    modal_t.classList.remove('show');
    modal_t.classList.add('hidden');
  }

  goToProfile(){
    this.router.navigate(['portfolio',this.getUserID()]);
  }  
}
