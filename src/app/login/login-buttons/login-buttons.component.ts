import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BtnEmailComponent } from './btn-email/btn-email.component';
import { BtnGoogleComponent } from './btn-google/btn-google.component';
import { BtnMobileComponent } from './btn-mobile/btn-mobile.component';
import { BtnFacebookComponent } from './btn-facebook/btn-facebook.component';
import { RouterModule } from '@angular/router';
import { BtnAnonymousComponent } from './btn-anonymous/btn-anonymous.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-buttons',
  standalone: true,
  imports: [CommonModule, RouterModule, BtnEmailComponent, BtnAnonymousComponent, BtnGoogleComponent, BtnMobileComponent, BtnFacebookComponent],
  template: `
    <div id="login-buttons" class="row top-10">
      <app-btn-google (click)="service.loginWithGoogle()"></app-btn-google>
      <app-btn-email [routerLink]="['/login/email']"></app-btn-email>
      <app-btn-anonymous (click)="service.loginAnonymous()"></app-btn-anonymous>
    </div>
  `
})
export class LoginButtonsComponent {
  constructor(public service: LoginService) { }
}

