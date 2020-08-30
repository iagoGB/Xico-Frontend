import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpClient
  ) { }

  login(value: any) {
    return this.httpService.post(`${ environment.apiUrl }/login`,value);
  }

  logout(){
    localStorage.removeItem('user');
  }

  autenthicate(value:any){
    console.log('value authenticated'+ JSON.stringify(value));
    localStorage.setItem('user',JSON.stringify(value));
  }

  getData(){
    return JSON.parse(localStorage.getItem('user'));
  }

  isLoggedIn(){
    return localStorage.getItem('user')? true : false;
  }
}
