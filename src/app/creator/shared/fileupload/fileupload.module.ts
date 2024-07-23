import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FileuploadComponent
  ],
  exports:[
    FileuploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FileuploadModule { }
