import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorNavComponent } from './creator-nav.component';

describe('CreatorNavComponent', () => {
  let component: CreatorNavComponent;
  let fixture: ComponentFixture<CreatorNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
