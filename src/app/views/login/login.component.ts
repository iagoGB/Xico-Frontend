import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[ Validators.required,Validators.email ]),
      password: new FormControl(null,Validators.required)
    });
  }

  onLogin(){
    this.authService.login(this.loginForm.value).subscribe((resp) => {
      this.authService.autenthicate(resp);
      this.router.navigate(['/']);
    });
  }

}
