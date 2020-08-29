import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SusbcribeComponent } from './susbcribe.component';

describe('SusbcribeComponent', () => {
  let component: SusbcribeComponent;
  let fixture: ComponentFixture<SusbcribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SusbcribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SusbcribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
