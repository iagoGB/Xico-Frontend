import { Component, OnInit, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit,OnChanges {
  @Input() title: string = 'CADASTRO';
  @Input() divHeight: number;
  @Input() divWidth: number;

  constructor(private el: ElementRef) { }

    ngOnChanges(change: SimpleChanges){
      console.log(change);
      this.divHeight = Number(change.divHeight.currentValue);
      this.divWidth = Number(change.divWidth.currentValue);

    }

    ngOnInit() {
      console.log(this.divHeight, this.divWidth);
      // this.el.nativeElement.addEventListener('click', () => {
      //   this.close()
      // })
    }

    close() {
      this.el.nativeElement.classList.remove('show')
      this.el.nativeElement.classList.add('hidden')
    }
}
