import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  
  constructor(
    private httpService: HttpClient
  ) { }

  save(imageList: any[], value: any) {
    console.log(value);
    let result = {...value };
    result.tags = [result.tags];
    const formData = new FormData();
    imageList.forEach(image => {
      formData.append('images', image.file);
    });
    formData.append('portfolio',JSON.stringify( result ));
    return this.httpService.post(`${ environment.apiUrl }/portfolio`,formData);
    
  }

  findByID(id:number) {
    return this.httpService.get(`${ environment.apiUrl }/portfolio/${ id }`);
  }

  findAll(){
    return this.httpService.get<any[]>(`${ environment.apiUrl }/portfolio`);
  }
}
