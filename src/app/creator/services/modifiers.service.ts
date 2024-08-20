import { EventEmitter, Injectable } from '@angular/core';
import { Componente, Elemento, Modifier, Texto } from 'src/app/services/interfaces/componente';
import { ComponentService } from './component.service';
import { ElementsService } from './elements.service';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class ModifiersService {
  

  modifiers: EventEmitter<Modifier[]> = new EventEmitter();

  constructor(private component:ComponentService, private elements:ElementsService, private history:HistoryService) { }

  setModifiers() {
    this.modifiers.emit(this.component.currentComponent.modifiers);
  }
  
  addTextModifier(data: Texto) {
    let modifier:Modifier = {} as Modifier;
    modifier.component = this.component.currentComponent.id;
    modifier.type = 'text';
    modifier.property = 'text';
    modifier.title = 'Texto';
    modifier.data = data;
    this.component.currentComponent.modifiers.push(modifier);
    this.setModifiers();
  }

  addSVGModifier(data: Elemento) {
    let modifier:Modifier = {} as Modifier;
    modifier.component = this.component.currentComponent.id;
    modifier.type = 'svg';
    modifier.property = 'svg';
    modifier.title = 'Elemento';
    modifier.data = data;
    this.component.currentComponent.modifiers.push(modifier);
    this.setModifiers();
  }

  addImageModifier(data: any) {
    let modifier:Modifier = {} as Modifier;
    modifier.component = this.component.currentComponent.id;
    modifier.type = 'img';
    modifier.property = 'img';
    modifier.title = 'Imagem';
    modifier.data = data;
    this.component.currentComponent.modifiers.push(modifier);
    this.setModifiers();
  }

  updateItemModifier(modifier:Modifier, value:any){
    this.component.currentComponent[modifier.property] = value;
    switch (modifier.property) {
      case 'background': this.component.setComponentBackground(value);
        break;
      case 'track': this.elements.addSvgElement(value);
         break;
      case 'group': this.component.addGroupComponents(modifier, value);
         break;
       case 'color': this.elements.setElementColor(value, 'editableObject');
         break;
       case 'text': this.elements.updateTextElement(value);
        break;
       case 'svg': this.elements.updateSVGElement(value);
        break;
      // case 'text': this.setComponentText(value)
      //   break;
      
      default:
        break;
      }
      this.history.addItemSnapshot();
    }

    updateElementPosition(data: any, x: any, y: any) {
      let modifier:Modifier = this.component.currentComponent.modifiers.find(m => m.data?.id === data);
      modifier.data.x = x;
      modifier.data.y = y;
      this.setModifiers();      
    }

    deleteModifier(modifier: Modifier) {
      this.component.currentComponent.modifiers = this.component.currentComponent.modifiers.filter(m => m !== modifier);
      this.setModifiers();
  
      const object = document.getElementById(modifier.data.id);
        if (object) {
          object.remove();
        }
  
    }
}
