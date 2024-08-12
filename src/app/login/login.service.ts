import { inject, Injectable } from '@angular/core';
import { FacebookAuthProvider, GoogleAuthProvider, RecaptchaVerifier, getAuth, signInAnonymously, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService, MaterializeService } from '@ollieestudio/fire-lib';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  public verificationcode: any;

  
  confirmationSent!: firebase.auth.ConfirmationResult;
  confirmationSentOk:boolean = false;
  // otpInputConfig: NgxOtpInputConfig = {
  //   otpLength: 6,
  //   autofocus:true,
  //   pattern: /^\d+$/,
  //   classList: {
  //     input: 'otp-input',
  //     container: 'otp-container',
  //     inputBox: 'otp-box',
  //   },
  // };
  applicationVerifier!: any;

  _auth = getAuth();
  
  constructor(private auth:AuthService<any>, private router:Router, private material:MaterializeService) {
    this.auth.stateObservable.subscribe((user:any) => {
      if(user) this.setUser(user);
    })
   }
  
  async loginWithGoogle() {
    const userCred = await signInWithPopup(this._auth, new GoogleAuthProvider());
    this.setUser(userCred.user)
    // this.analytics.logEvent('loginWithGoogle');
  }
  
  async loginWithFacebook() {
    const userCred = await signInWithPopup(this._auth, new FacebookAuthProvider());
    this.setUser(userCred.user)
    // this.analytics.logEvent('loginWithFacebook');
  }

  async loginAnonymous() {
    const userCred = await signInAnonymously(this._auth);
    this.setUser(userCred.user)
    // this.analytics.logEvent('loginAnonymous');
  }
  


  setUser(user: any) {
    console.log(user);
    this.auth.User = {uid: user.uid
                      , phoneNumber: user.providerData[0]?.phoneNumber || ''
                    , displayName: user.displayName || ''
                    , email: user.email || ''
                    , photoURL: user.photoURL || ''
                    , providerId: user.providerData[0]?.providerId || ''};
    this.router.navigateByUrl('/creator')
  }

  login(tmp:any) {
        this.auth.loginWithEmail(tmp.username, tmp.password).then((result:any) => {
          this.setUser(result.user);
          // this.analytics.logEvent('loginWithEmail');
        }).catch(error => {
          if (error.code == "auth/user-not-found") {
             this.auth.signUpWithEmail(tmp.username, tmp.password).then((result:any) => {
              this.setUser(result.user);
              // this.analytics.logEvent('signUpWithEmail');
             })
          } else {
            if (error.code == "auth/wrong-password") {
              this.material.toast("Senha incorreta.", 3000, 'floatingbox shadowed white black-text');
            } 
          } 
        })
      }

  

      loginWithPhone(data:any){
        let phone:string = '+55' + data.celular.replace(/[^0-9]+/g, '');
        console.log(phone);
        if(!this.applicationVerifier) this.applicationVerifier = new RecaptchaVerifier( 'recaptcha-container',{size:'invisible'}, this._auth,);
        this.auth.afAuth.signInWithPhoneNumber(phone, this.applicationVerifier).then(confirmation =>{
         this.confirmationSent = confirmation;
         this.confirmationSentOk = true;
        }).catch(err => console.log(err))
      }
    
      getVerificationCode(event: any){
          this.verificationcode = event;
          if(this.verificationcode.join('').length === 6){
            this.sendVerificationCode()
          }
      }
    
      disableTenantId() {
            // firebase.auth().tenantId = null;
      }
    
      resetPhoneLogin() {
        this.verificationcode = undefined;
        this.confirmationSentOk = false;
       }
      
       
      sendVerificationCode(){
        this.confirmationSent.confirm(this.verificationcode.join('')).then((signInSuccessData: { user: any; }) =>{
          if(signInSuccessData)  this.setUser(signInSuccessData.user)
        }).catch((error: { code: string; }) =>{
          this.material.toast(error.code, 3000, 'white red-text flatbox shadowed');
          if(error.code === 'auth/user-not-found') {
            
          };
        })
      }
  
}
