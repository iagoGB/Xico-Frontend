import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';
import { toolsOptions } from '../utils/utils';

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

  update(user: User, image: File) {
    user.tools = user.tools.map(e => e.value);
    const formData = new FormData();
    formData.append('usuario',JSON.stringify(user));
    if (image)
      formData.append('imagem', image);
    return this.http.put<any>(`${ environment.apiUrl }/usuario/${user.id}`,formData);
  }

  delete(id: number){
    return this.http.delete(`${ environment.apiUrl }/usuario/${id}`);
  }

  convertToTools(tool: string){
    switch (this.getTool(tool)) {
      case 'figma.svg':
        return toolsOptions[0];
      
      case 'reaper.svg':
        return toolsOptions[1];

      case 'photshop.svg':
        return  toolsOptions[2];

      case 'lightroom.svg':
        return toolsOptions[3];
    
      default:
        console.log('');
      break;
    }
  }

  private getTool(tool: string) {
    const value = tool.split('tools/')[1];
    return value;
  }
  
}
