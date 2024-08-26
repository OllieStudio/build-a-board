import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/creator/services/component.service';
import { CreatorUIService, ItemSnapshot } from 'src/app/creator/services/creator.service';
import { DragDropService } from 'src/app/creator/services/drag.service';
import { DrawerService } from 'src/app/creator/services/drawer.service';
import { ElementsService } from 'src/app/creator/services/elements.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit{
  
  constructor(public creator:CreatorUIService,  private cdr: ChangeDetectorRef, public elements:ElementsService, public dragservice:DragDropService,  public component:ComponentService, public drawer:DrawerService){
    this.drawer.closeToolBox();
    this.drawer.closeDrawer();
    this.component.componentEmitter.subscribe(evt => this.cdr.detectChanges());
    
  }

  ngOnInit(): void {
     this.elements.addedElements = [];
  }

  onDragEnded(event: CdkDragEnd) {
    const { x, y } = event.source.getFreeDragPosition();
    event.source.element.nativeElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  trackById(index: number, element: any): number {
    return element.data?.id; 
  }

 
}
