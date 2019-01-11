import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiForAgeComponent } from './bmi.component';

describe('BmiForAgeComponent', () => {
  let component: BmiForAgeComponent;
  let fixture: ComponentFixture<BmiForAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmiForAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmiForAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
