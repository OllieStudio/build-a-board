import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponent } from './common/common.component';
import { IconsetComponent } from './iconset/iconset.component';
import { SectionsComponent } from './sections.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    IconsetComponent,
    CommonComponent,
    SectionsComponent,
    HeaderComponent,
  ],
  exports:[
    IconsetComponent,
    CommonComponent,
    SectionsComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class SectionsModule { }
