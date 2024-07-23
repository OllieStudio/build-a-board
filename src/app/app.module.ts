import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgModule,OnInit} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from "@angular/forms";
import { ContatoComponent } from './contato/contato.component';
import { ConfigService, AuthService, FormService, DatabaseService, CookieService, CepService, AngularFireModule, AngularFireAuthModule, AngularFireStorageModule, AngularFirestoreModule } from '@ollieestudio/fire-lib';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FirebaseConfigService } from './services/firebase-config.service';
import { CatalogformComponent } from './catalogform/catalogform.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxWigModule } from 'ngx-wig';

@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    CatalogformComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollToModule.forRoot(),
    AnimateOnScrollModule.forRoot(),
    ReactiveFormsModule,
    NgxWigModule
   ],
  providers:  [ ConfigService, AuthService, FormService, DatabaseService, CookieService,  
    CepService,  HttpClient, FirebaseConfigService, DatePipe, AngularFirestoreModule],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {

  constructor() {

  }

  ngOnInit() {
  
  }

}
