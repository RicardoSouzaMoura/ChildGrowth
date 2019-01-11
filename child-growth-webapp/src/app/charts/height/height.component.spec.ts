import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeightForAgeComponent } from './height.component';

describe('HeightForAgeComponent', () => {
  let component: HeightForAgeComponent;
  let fixture: ComponentFixture<HeightForAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeightForAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeightForAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
