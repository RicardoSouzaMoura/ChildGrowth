import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChildComponent } from './manage-child.component';

describe('ManageChildComponent', () => {
  let component: ManageChildComponent;
  let fixture: ComponentFixture<ManageChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
