import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home.component';
import { BannersModule } from 'components/crm/banners/banners.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ResourcesComponent } from './resources/resources.component';
import { SectionsModule } from 'components/sections/sections.module';
import { HeroComponent } from './hero/hero.component';
import { DestaquesComponent } from './destaques/destaques.component';
import { NavComponent } from '../nav/nav.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    AboutComponent,
    HeroComponent,
    HomeComponent,
    ResourcesComponent,
    DestaquesComponent,
    NavComponent
  ],
  exports:[
    HomeComponent
  ],
  imports: [
    CommonModule,
    BannersModule,
    SectionsModule,
    ScrollToModule.forRoot(),
    AnimateOnScrollModule.forRoot(),
    AppRoutingModule

  ]
})
export class HomeModule { }
