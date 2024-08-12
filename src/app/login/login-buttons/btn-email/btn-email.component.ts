import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-email',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button" data-provider-id="password" data-upgraded=",MaterialButton">
    <span class="firebaseui-idp-icon-wrapper">
    <img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"></span>
    <span class="white-text left-2">Fazer login com o e-mail</span>
    <span class="firebaseui-idp-text firebaseui-idp-text-short">E-mail</span></button>
  `
})
export class BtnEmailComponent {

}
