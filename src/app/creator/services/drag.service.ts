import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { ElementsService } from './elements.service';
import { HistoryService } from './history.service';
import { ModifiersService } from './modifiers.service';
import { ComponentService } from './component.service';
import { CreatorUIService } from './creator.service';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor(private creator:CreatorUIService, private component:ComponentService, private history:HistoryService, private elements:ElementsService, private modifiers:ModifiersService) { }

  dropElement(event: CdkDragDrop<string[]>) {
    console.log(event);
    if ( event.previousContainer.id === "components" && event.container.id === "canvas") {
      this.component.addComponent(event.item.data);
      this.creator.hasItemLoaded = true;
      this.modifiers.setModifiers();
      this.history.addItemSnapshot(event.item.data);
    }
    if (event.previousContainer.id === "text-container" && this.component.currentComponent.allowdrop) {
      this.elements.addTextElement(event.item.data);
      this.modifiers.addTextModifier(event.item.data);
      this.history.addItemSnapshot(event.item.data);
    }
    if (event.previousContainer.id === "svg-container" && this.component.currentComponent.allowdrop) {
      this.elements.addSvgElement(event.item.data);
      this.modifiers.addSVGModifier(event.item.data);
      this.history.addItemSnapshot(event.item.data);
    }
    if ( event.previousContainer.id === "upload-container") {
      this.elements.addImageElement(event.item.data);
      this.modifiers.addImageModifier(event.item.data);
      this.history.addItemSnapshot(event.item.data);
    }
  }
}
