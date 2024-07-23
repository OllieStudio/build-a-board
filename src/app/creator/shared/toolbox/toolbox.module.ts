import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolboxRoutingModule } from './toolbox-routing.module';
import { ToolboxComponent } from './toolbox.component';


@NgModule({
  declarations: [ToolboxComponent],
  exports:[ToolboxComponent],
  imports: [
    CommonModule,
    ToolboxRoutingModule
  ]
})
export class ToolboxModule { }
