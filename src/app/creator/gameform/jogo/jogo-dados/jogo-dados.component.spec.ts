import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoDadosComponent } from './jogo-dados.component';

describe('JogoDadosComponent', () => {
  let component: JogoDadosComponent;
  let fixture: ComponentFixture<JogoDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogoDadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogoDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
