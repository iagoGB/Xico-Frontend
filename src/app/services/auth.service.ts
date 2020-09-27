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
    sessionStorage.removeItem('user');
  }

  autenthicate(value:any){
    sessionStorage.setItem('user',JSON.stringify(value));
  }

  getData(){
    return JSON.parse(sessionStorage.getItem('user'));
  }

  isLoggedIn(){
    return sessionStorage.getItem('user')? true : false;
  }
}
