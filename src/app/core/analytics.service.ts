import { FirebaseApp } from '@angular/fire/app';
import { inject, Injectable } from '@angular/core';
import { getAnalytics } from "firebase/analytics";
import { logEvent } from '@angular/fire/analytics';

@Injectable({
    providedIn: 'root'
  })
  
  export class AnalyticsService {
    private analytics = getAnalytics(inject(FirebaseApp));

      constructor(){}
      
      logEvent(eventName: any, eventParams?:any) {
        logEvent(this.analytics, eventName);
      }
  }