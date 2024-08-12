import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormService, InputBase } from '@ollieestudio/fire-lib';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-email',
  standalone: true,
   imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
  
  <form id="loginform" (submit)="login()" [formGroup]="formLogin" class="">
       <div class="row center-align">
        <div class="col s12">
          <input id="username" placeholder="E-mail" name="username" type="text" class="browser-default" [formControlName]="'username'" />
        </div>
      </div>
      <div class="row center-align">
        <div class="col s12" style="position:relative">
          <input id="loginpassword" placeholder="Senha" name="password"  [type]="showPassword ? 'text' : 'password'" class="browser-default" [formControlName]="'password'" [autocomplete]="'current-password'"  />
            <i class="purple-text material-symbols-outlined link suffix" *ngIf="!showPassword" (click)="showPassword = !showPassword">visibility</i>
            <i class="purple-text material-symbols-outlined link suffix" *ngIf="showPassword" (click)="showPassword = !showPassword">visibility_off</i>
        </div>
      </div>
      <div class="row center-align">
          <button type="submit" class="btn purple">entrar</button>
          <a routerLink="/" id="back" class="btn-sub top-3 white-text subtitle col s12 large">voltar</a>
      </div>
      
 
    </form>

    <div class="center row s12 m5 top-5">
    <div class="col s12 m5 center">
      <div class="center">
        <a routerLink="/restore" class="white-text top-5 subtitle underline medium-text">ESQUECI MINHA SENHA</a>
      </div>
    </div>
  </div>

    
 
  `,

})
export class LoginEmailComponent {
  public formLogin: FormGroup;
  public showPassword: boolean = false;
  private fields: InputBase[] = [{
      key: "username",
      required: true
    },
    {
      key: "password",
      required: true
    },
  ]
 
  constructor(private forms:FormService, private service:LoginService){
  this.formLogin = this.forms.toFormGroup(this.fields);
  }

  login() {
    this.service.login(this.formLogin.getRawValue());
  }

}
