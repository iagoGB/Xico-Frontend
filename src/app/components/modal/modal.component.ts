import { Component, OnInit, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit,OnChanges {
  @Input() title: string = 'CADASTRO';
  @Input() divHeight: number = 480
  @Input() divWidth: number = 480

  constructor(
    private el: ElementRef,
    private router: Router
    ) { }

    ngOnChanges(change: SimpleChanges){
      this.divHeight = Number(change.divHeight.currentValue);
      this.divWidth = Number(change.divWidth.currentValue);
    }

    ngOnInit() {
      console.log("iniciou a modal")
    }

    close() {
      this.router.navigate(['/']);
    }
}
