import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericstepperComponent } from './numericstepper.component';

describe('NumericstepperComponent', () => {
  let component: NumericstepperComponent;
  let fixture: ComponentFixture<NumericstepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericstepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
