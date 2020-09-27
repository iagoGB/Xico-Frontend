import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[ Validators.required,Validators.email ]),
      password: new FormControl(null,Validators.required)
    });
  }

  onLogin(){
    this.spinnerService.show();
    this.authService.login(this.loginForm.value).subscribe((resp) => {
      this.authService.autenthicate(resp);
      this.spinnerService.hide();
      this.router.navigate(['/']);
    },(err:HttpErrorResponse) =>  {
      this.spinnerService.hide();
      if (err.status === 401)
        this.toastrService.warning('Usuário ou senha inválidos');
    });
  }

}
