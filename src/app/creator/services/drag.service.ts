import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { ElementsService } from './elements.service';
import { HistoryService } from './history.service';
import { ModifiersService } from './modifiers.service';
import { ComponentService } from './component.service';
import { CreatorUIService } from './creator.service';
import { Componente, Elemento, Texto } from 'src/app/services/interfaces/componente';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor(private creator:CreatorUIService, private component:ComponentService, private history:HistoryService, private elements:ElementsService, private modifiers:ModifiersService) { }

  dropElement(event: CdkDragDrop<string[]>) {
    console.log(event);
    if ( event.previousContainer.id === "components" && event.container.id === "canvas") {
      this.addNewComponent(event.item.data);
    }
    if ( event.previousContainer.id === "drawer" && event.container.id === "canvas") {
      this.addDrawerComponent(event.item.data);
    }
    if (event.previousContainer.id === "text-container" && this.component.currentComponent.allowdrop) {
      this.addText({...event.item.data, type: "text"} as unknown as Texto);
    }
    if (event.previousContainer.id === "svg-container" && this.component.currentComponent.allowdrop) {
      this.addElement({...event.item.data, type: "element"} as unknown as Elemento);
    }
    if ( event.previousContainer.id === "upload-container") {
      this.addImage({...event.item.data, type: "image"} as unknown as Elemento);
    }
  }

  private addImage(data: any) {
    data.id = data.id + this.elements.addedElements.length;
    this.elements.addNewElement(data);
    this.modifiers.addImageModifier(data);
    this.history.addItemSnapshot(data);
  }

  private addElement(data:Elemento) {
    data.id = data.id + this.elements.addedElements.length;
    this.elements.addNewElement(data);
    this.modifiers.addSVGModifier(data);
    this.history.addItemSnapshot(data);
  }

  private addText(data:Texto) {
    data.id = data.id + this.elements.addedElements.length;
    this.elements.addNewElement(data);
    this.modifiers.addTextModifier(data);
    this.history.addItemSnapshot(data);
  }

  private addNewComponent(data:Componente) {
    this.component.addComponent(data);
    this.creator.hasItemLoaded = true;
    this.modifiers.setModifiers();
    this.history.addItemSnapshot(data);
  }
 
  private addDrawerComponent(data:Componente) {
    this.component.loadComponent(data);
    this.creator.hasItemLoaded = true;
    this.elements.loadElements(data);
    this.modifiers.setModifiers();
    this.history.addItemSnapshot(data);
  }

  onDragEnded(event: CdkDragEnd) {
    const { x, y } = event.source.getFreeDragPosition();
    event.source.element.nativeElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    const element = event.source.element.nativeElement;
    const parentElement = element.offsetParent;

    const elementRect = element.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect();

    const parentx = elementRect.x - parentRect.x;
    const parenty = elementRect.y - parentRect.y;

    this.modifiers.updateModifierPosition(event.source.element.nativeElement.id, parentx, parenty);
  }
}
