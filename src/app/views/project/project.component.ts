import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  projetoForm: FormGroup;
  imageList: Array<any> = [];

  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit() {

    this.projetoForm = new FormGroup({
      category: new FormControl('DESIGN', Validators.required),
      userID: new FormControl(this.authService.getData().id, Validators.required),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
      tags: new FormControl(null),
      files: new FormControl([])
    });

    console.log(this.projetoForm.value);
  }

  getImages() {
    document.getElementById('images').click();
  }

  loadImages($event) {
    console.log("Entrou em load images")
    if ($event.target.files.length > 0) {
      const files = $event.target.files as FileList;
      for (let index = 0; index < files.length; index++) {
        console.log(files[index].name);
        const reader = new FileReader();
        reader.readAsDataURL(files[index]);
        reader.onload = (event) => {
          console.log('terminou de ler');
          this.imageList.push({ file: files[index], src: reader.result.toString() })
        }
      }
      console.log(this.imageList);
    }
  }

  print($event){
    console.log("Dragula");
    console.log($event);
  }

  createProject(){
    this.portfolioService.save(this.imageList,this.projetoForm.value).subscribe(
      (success) =>{
        console.log('Criou!'+ success);
      },
      (err) =>{
        console.log('Deu erro!' + err);
      }
    )
  }
}
