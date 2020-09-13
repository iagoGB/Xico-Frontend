import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-background',
  templateUrl: './custom-background.component.html',
  styleUrls: ['./custom-background.component.sass']
})
export class CustomBackgroundComponent implements OnInit {
  @Input() title: string = 'CADASTRO';

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  close(){
    this.location.back();
  }
}
