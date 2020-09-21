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

  getUser(id: number) {
    return this.http.get(`${ environment.apiUrl }/usuario/${ id }`);
  }

  save( user: User, imagem: File ){
    const http = new HttpHeaders().append('Authorization', 'augenega');
    const formData = new FormData();
    formData.append('usuario',JSON.stringify(user));
    formData.append('imagem', imagem);
    return this.http.post(`${ environment.apiUrl }/usuario`, formData, { headers: http});
  }
}
