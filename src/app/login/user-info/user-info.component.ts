import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, UserInfoFormComponent],
  template: `
  <div class="left-5 top-10">

  <h5 class="logintitle top-5">Seu perfil</h5>
  <h6 class="loginsubtitle top-2 bottom-5">Edite aqui suas informações pessoais e de acesso.</h6>
  
  <app-user-info-form></app-user-info-form>

</div>
  `,
})
export class UserInfoComponent {

}
