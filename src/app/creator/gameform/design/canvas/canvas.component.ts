import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ComponentService } from 'src/app/creator/services/component.service';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { DragDropService } from 'src/app/creator/services/drag.service';
import { DrawerService } from 'src/app/creator/services/drawer.service';
import { ElementsService } from 'src/app/creator/services/elements.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {
  
  constructor(public creator:CreatorUIService, public elements:ElementsService, public dragservice:DragDropService,  public component:ComponentService, public drawer:DrawerService){
    this.drawer.closeToolBox();
    this.drawer.closeDrawer();
  }

  onDragEnded(event: CdkDragEnd) {
    const { x, y } = event.source.getFreeDragPosition();
    event.source.element.nativeElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

}
