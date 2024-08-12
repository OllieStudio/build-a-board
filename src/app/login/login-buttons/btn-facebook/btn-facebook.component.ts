import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-facebook',
  standalone: true,
  imports: [CommonModule],
  template: `
   <button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-facebook firebaseui-id-idp-button" data-provider-id="facebook.com" data-upgraded=",MaterialButton"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">Fazer login com Facebook</span><span class="firebaseui-idp-text firebaseui-idp-text-short">Facebook</span></button>
  `
})
export class BtnFacebookComponent {

}
