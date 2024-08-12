import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-anonymous',
  standalone: true,
  imports: [],
  template: `
     <button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button" data-provider-id="password" data-upgraded=",MaterialButton">
     <span class="firebaseui-idp-icon-wrapper">
     <i class="material-icons white-text">visibility_off</i></span>
     <span class="white-text left-2">Fazer login anônimo</span><span class="firebaseui-idp-text firebaseui-idp-text-short">login anônimo</span></button>
 
  `
})
export class BtnAnonymousComponent {

}
