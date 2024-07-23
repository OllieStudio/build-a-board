import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoNavComponent } from './jogo-nav.component';

describe('JogoNavComponent', () => {
  let component: JogoNavComponent;
  let fixture: ComponentFixture<JogoNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogoNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogoNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
