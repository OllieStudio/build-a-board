import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@ollieestudio/fire-lib';
import { UserProfilePhotoComponent } from './user-photo/user-photo.component';
import { UserInfoService } from '../user-info.service';
import { Usuario } from 'src/app/services/interfaces/usuario';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-info-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UserProfilePhotoComponent],
  standalone:true,
  template: `
    <form class="valign form " style="" [formGroup]="userInfoForm">
    <app-user-profile-photo class="center" ></app-user-profile-photo>
      <div class="row bottom-0">
        <div class="input-field col s12">
          <input id="last_name" type="text" style="margin-top: 10px;" class="validate purple-text white" formControlName="displayName">
          <label for="last_name" class="active purple-text text-darken-2">Apelido</label>
        </div>
      </div>
      <div class="row bottom-0">
        <div class="input-field col s12">
          <input id="phoneNumber" [disabled]="auth.User.providerId != 'phone'" pattern="+55[0-9]{11}" type="tel" style="margin-top: 10px;"  class="validate ng-touched purple-text white" formControlName="phoneNumber">
          <label for="phoneNumber" class="active purple-text text-darken-2">Celular</label>
        </div>
      </div>
      <div class="row bottom-0">
        <div class="input-field col s12">
          <input id="email" type="email" style="margin-top: 10px;" class="validate purple-text white" formControlName="email">
          <label for="email" class="active purple-text text-darken-2">Email</label>
        </div>
      </div>
      <div class="row bottom-0">
        <div class="col s12" style="position:relative">
          <label for="password" class="active purple-text text-darken-2">Senha</label>
          <input id="password"  name="password"  [type]="showPassword ? 'text' : 'password'"  style="margin-top: 10px;" class="validate purple-text white" [formControlName]="'password'" [autocomplete]="'current-password'"  />
            <i class="purple-text material-symbols-outlined link suffix" *ngIf="!showPassword" (click)="showPassword = !showPassword">visibility</i>
            <i class="purple-text material-symbols-outlined link suffix" *ngIf="showPassword" (click)="showPassword = !showPassword">visibility_off</i>
        </div>
      </div>
      <div class="row bottom-0">
        <div class="col s12">
        <button class=" btn purple col s3 right white-text" id="bt-save" (click)="saveUser()" [disabled]="userInfoForm.invalid">salvar</button>
        <a [routerLink]="'/creator'" id="back" class="purple-text col s2 top-1 right link">voltar</a>
        </div>
      </div>
      <br>
      <br>
    </form>
  `
})
export class UserInfoFormComponent implements OnInit {
  userInfoForm!: FormGroup;
showPassword: any;

  constructor(private fb: FormBuilder, public auth:AuthService<Usuario>, public service:UserInfoService ){ }

  ngOnInit(): void {
    this.userInfoForm = this.fb.group({
      displayName: [''],
      phoneNumber: [''],
      email: ['', [Validators.email]],
      password: ['']
    });
    this.userInfoForm.patchValue(this.auth.User)
  }

  saveUser(){
    if (this.userInfoForm.valid) {
      const formValue = this.userInfoForm.getRawValue();
    
      if(formValue.displayName != this.auth.User.displayName){
        this.service.updateUserDisplayName(formValue.displayName);
      }

      if(formValue.email != this.auth.User.email ){
        this.service.updateUserEmail(formValue.email);
      }
      
      if(formValue.password != this.auth.User.password){
        this.service.updateUserPassword(formValue.password);
      }
      
      if(formValue.phoneNumber != this.auth.User.phoneNumber){
        this.service.updateUserPhoneNumber(formValue.phoneNumber, formValue.password);
      }

    }
  }
}

  