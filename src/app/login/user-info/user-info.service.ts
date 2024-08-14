import { Injectable, OnInit } from '@angular/core';
import { EmailAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService, MaterializeService } from '@ollieestudio/fire-lib';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService implements OnInit {
 
  photoURL: string | null = null;
  currentUser: any; // Store the current user
  
  constructor( private afAuth: AngularFireAuth, private material:MaterializeService, private auth:AuthService<any>) { 
    
    this.afAuth.user.subscribe(user => {
      if (user) {
      this.currentUser = user; // Store the user
      this.photoURL = user.photoURL;
      this.auth.User = {uid: user.uid
        , phoneNumber: user.providerData[0]?.phoneNumber || ''
      , displayName: user.displayName || ''
      , email: user.email || ''
      , photoURL: user.photoURL || ''
      , providerId: user.providerData[0]?.providerId || ''};
      } else {
        this.currentUser = null;
        this.photoURL = null;
      }
    });
  }

  ngOnInit() {
    
  }

 updateUserPassword(password: any) {
  this.currentUser?.updatePassword(password)
  .then(() => {
    this.material.toast('Senha atualizada com sucesso!', 4000, '');
  })
  .catch((error: any) => console.error('Error updating email: ', error));
  }
 
  updateUserPhoto(url: string): void {
    this.currentUser?.updateProfile({ photoURL: url })
      .then(() => {
        console.log('User profile updated successfully!');
        this.material.toast('Foto atualizada com sucesso!', 4000, ''); 
        this.photoURL = url;
        this.auth.User = this.currentUser;
      })
      .catch((error: any) => console.error('Error updating user profile: ', error));
  }

   updateUserDisplayName(displayName:string) {
      this.currentUser?.updateProfile({
        displayName: displayName,
      }).then(() => {
        // Update successful
        this.material.toast('Perfil do usuário atualizado com sucesso!', 4000, ''); 
      }).catch((error: any) => {
        // Handle errors
        console.error('Error updating profile:', error);
      });
    }
  
    updateUserEmail(newEmail: string) {
      this.currentUser?.updateEmail(newEmail)
        .then(() => {
          this.material.toast('Email atualizado com sucesso!', 4000, '');
        })
        .catch((error: any) => console.error('Error updating email: ', error));
    }

    updateUserPhoneNumber(newPhoneNumber: string, password: string) {
      this.currentUser?.reauthenticateWithCredential(EmailAuthProvider.credential(this.currentUser.email, password))
        .then(() => {
          this.currentUser?.updateUserPhoneNumber( newPhoneNumber ) // Store as custom data
            .then(() => {
              console.log('Phone number updated successfully!');
            })
            .catch((error: any) => {
              console.error('Error updating phone number: ', error);
            });
        })
        .catch((error: any) => {
          console.error('Error re-authenticating: ', error);
        });
    }
}
