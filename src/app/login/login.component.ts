import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonsComponent } from './login-buttons/login-buttons.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,  LoginButtonsComponent],
  template: `

  <nav>
  <div class="nav-wrapper">
  <a href="#!" class="brand-logo">
    <img src="assets/img/logo.png" alt="" class="logo">
  </a>
  </div>
</nav>
   <div class="overlay">

  <div class="card-title row s12 center valign-wrapper top-10">
    <h5 class="valign logintitle col s12 center top-10 left-2 notranslate">
      <i class="material-icons right notranslate">blur_on</i>LOGIN/SIGNUP</h5>
  </div>

  <router-outlet></router-outlet>
  `,
})

export class LoginComponent {
 constructor() {}

}
