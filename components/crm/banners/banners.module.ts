import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners.component';



@NgModule({
  declarations: [
    BannersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BannersComponent
  ]
})
export class BannersModule { }
