import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  
  constructor(
    private httpService: HttpClient,
    private authService: AuthService
  ) { }

  save(imageList: any[], value: any) {
    value.tools = value.tools.map(e => e.value);
    const formData = new FormData();
    imageList.forEach(image => {
      formData.append('images', image.file);
    });
    formData.append('portfolio',JSON.stringify( value ));
    return this.httpService.post(`${ environment.apiUrl }/portfolio`,formData);
    
  }

  findByID(id:number) {
    return this.httpService.get(`${ environment.apiUrl }/portfolio/${ id }`);
  }

  findAll(){
    return this.httpService.get<any[]>(`${ environment.apiUrl }/portfolio`);
  }

  increaseViews(portfolioID: number){
    return this.httpService.put<any>(`${ environment.apiUrl }/portfolio/${ portfolioID }/views`,null);
  }

  updateLike(portfolioID: number) {
    return this.httpService.put(`${ environment.apiUrl }/portfolio/${ portfolioID }/likes?tanner=${this.authService.getData()?.id}`,null);
  }
}
