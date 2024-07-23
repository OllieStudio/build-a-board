import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogformComponent } from './catalogform.component';

describe('CatalogformComponent', () => {
  let component: CatalogformComponent;
  let fixture: ComponentFixture<CatalogformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
