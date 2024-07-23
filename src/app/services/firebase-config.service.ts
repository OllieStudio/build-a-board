import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FirebaseConfigService {

    apiKey: "AIzaSyD6vEEFIGmQqHUl7SYMofg-BzK5VZNBacA";
    authDomain: "buildaboard2018.firebaseapp.com";
    databaseURL: "https://buildaboard2018.firebaseio.com";
    projectId: "buildaboard2018";
    storageBucket: "buildaboard2018.appspot.com";
    messagingSenderId: "674214686193";
    appId: "1:674214686193:web:dcb4158829bb7ffd8ae850"
    
    constructor(){}
    
    authConfig(){
      return {
        apiKey: "AIzaSyD6vEEFIGmQqHUl7SYMofg-BzK5VZNBacA",
        authDomain: "buildaboard2018.firebaseapp.com",
        databaseURL: "https://buildaboard2018.firebaseio.com",
        projectId: "buildaboard2018",
        storageBucket: "buildaboard2018.appspot.com",
        messagingSenderId: "674214686193",
        appId: "1:674214686193:web:dcb4158829bb7ffd8ae850"
      }
    }
}
