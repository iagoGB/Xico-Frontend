import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  save( user: User, imagem: File ){
    const http = new HttpHeaders().append('Authorization', 'augenega');
    console.log('imagem: ' + imagem);
    const formData = new FormData();
    formData.append('usuario',JSON.stringify(user));
    formData.append('imagem', imagem);
    return this.http.post(`${ environment.apiUrl }/usuario`, formData, { headers: http});
  }
}
