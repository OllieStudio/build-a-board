import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-mobile',
  standalone: true,
  imports: [CommonModule],
  template: `
   <button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-phone firebaseui-id-idp-button" data-provider-id="phone" data-upgraded=",MaterialButton"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/phone.svg"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">Fazer login com o telefone</span><span class="firebaseui-idp-text firebaseui-idp-text-short">Smartphone</span></button>
  `
})
export class BtnMobileComponent {

}
