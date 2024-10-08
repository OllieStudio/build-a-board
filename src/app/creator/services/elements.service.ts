import { Injectable } from '@angular/core';
import { Componente, Elemento, Texto } from 'src/app/services/interfaces/componente';
import { ElementSnapshot } from './creator.service';
import { ComponentService } from './component.service';
import { Upload } from 'src/app/services/interfaces/upload';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
 
addedElements:Elemento[] = [];

  constructor(private component:ComponentService) {
    this.addedElements = [];
    this.component.componentEmitter.subscribe(cmp => {
      if(cmp === null) {
        this.addedElements = [];
      }else{
        this.loadElements(cmp);
      }
    })
   }

  loadElements(data: Componente) {
    data.modifiers.forEach(modifier => {
      if (modifier.type === 'svg' || modifier.type === 'text' || modifier.type === 'upload') {
        if (modifier.data && !this.addedElements.some(element => element.id === modifier.data.id)) {
          this.addedElements.push(modifier.data);
        }
      }
    });
  }

  addNewElement(data: any) {
    data.id = data.id + this.addedElements.length;
    this.addedElements.push(data);
  }

  addTextElement(data: Texto, containerId?: string) {
    const container = document.getElementById(containerId);
    container.style.position = 'absolute';
    container.style.top  = `${data.y}px`;
    container.style.left = `${data.x}px`;
    container.style.transform = `rotate(${data.rotation}deg)`;
    container.style.width = `auto`;
    container.style.height = 'auto';

    if (container) {
      const span = document.createElement('span');
      span.textContent = data.content;
      span.id = data.id;
      span.style.fontFamily = data.selectedFont;
      span.style.fontSize = data.selectedSize + 'px';
      span.style.fontStyle = data.selectedStyle;
      span.style.color = data.selectedColor;

      container.appendChild(span);

    }
  }
  

  placeSvgInDiv(svgFileUrl: string, divElementId: string): void {
    const divElement = document.getElementById(divElementId);

    if (divElement) {
      divElement.innerHTML = ''; // Clear any existing content in the div
      
      const svgElement = document.createElement('object');
      svgElement.data = svgFileUrl;
      svgElement.type = 'image/svg+xml';

      // divElement.appendChild(svgElement);
      divElement.innerHTML = svgFileUrl;
    }
  }

  addSvgElement(item: Elemento, id?: string) {
    const divElement = document.getElementById(id).firstChild as HTMLDivElement;
    const parentElement = document.getElementById(id) as HTMLDivElement;
    
    if(item.x && item.y){
            parentElement.style.position = 'absolute';
            parentElement.style.left = `${item.x}px`;
            parentElement.style.top = `${item.y}px`;
    }

    if(item.size){
      parentElement.style.width = `${item.size}%`;
      parentElement.style.height = 'auto';
    }
    
    if(item.rotation){
      parentElement.style.transform = `rotate(${item.rotation}deg)`;
    }

    if (divElement) {
      const object = document.createElement('object');
      object.data = item.template;
      object.type = "image/svg+xml";
      
      // Set the object element to fit the div
      object.style.width = '100%';
      object.style.height = '100%';
      
      // Clear previous content and append the object
      divElement.innerHTML = '';
      divElement.appendChild(object);
    }
  }

  updateSVGElement(data:Elemento) {
    const object = document.getElementById(data.id);
    object.style.color = data.selectedColor; 
    object.style.justifyContent = data.verticalAlign;
    object.style.alignItems = data.horizontalAlign;
    object.style.width = `${data.size}%`;
    object.style.height = 'auto';
    object.style.transform = `rotate(${data.rotation}deg)`;
    object.style.left = `${data.x}px`;
    object.style.top = `${data.y}px`;
    
    this.setElementColor(data.selectedColor, data.id);
}
  
updateUplElement(data:Upload) {
    const object = document.getElementById(data.id);
    object.style.width = `${data.size}%`;
    object.style.height = 'auto';
    object.style.transform = `rotate(${data.rotation}deg)`;
    object.style.left = `${data.x}px`;
    object.style.top = `${data.y}px`;
}

  setElementColor(value: any, id) {
    const obj = document.getElementById(id).firstChild as unknown as SVGElement;
    if (obj) {
      const updateFill = (element: SVGElement, color: string) => {
        const elements = element.querySelectorAll('*');
        elements.forEach((el: SVGElement) => {
          const currentFill = el.getAttribute('fill');
          if (currentFill != null) {
            el.setAttribute('fill', color);
          }
        });
      };
      updateFill(obj, value);
      }
    }

    updateTextElement(data: Texto) {
      const span = document.getElementById(data.id);
      span.style.fontFamily = data.selectedFont;
      span.style.fontSize = data.selectedSize + 'px';
      span.style.fontStyle = data.selectedStyle;
      span.style.color = data.selectedColor; 
      span.style.textAlign = data.textAlign;
      span.innerText = data.content;
      span.style.justifyContent = data.verticalAlign;
      span.style.alignItems = data.horizontalAlign;
      span.style.transform = `rotate(${data.rotation}deg)`;
      span.style.left = `${data.x}px`;
      span.style.top = `${data.y}px`;
  }

  addImageElement(item: any, id?: string) {
    const divElement = document.getElementById(id) as HTMLDivElement;
    
    if(item.x && item.y){
      divElement.style.position = 'absolute';
      divElement.style.left = `${item.x}px`;
      divElement.style.top = `${item.y}px`;
    }

    if(item.size){
      divElement.style.width = `${item.size}%`;
      divElement.style.height = 'auto';
    }
    
    if(item.rotation){
      divElement.style.transform = `rotate(${item.rotation}deg)`;
    }

    if (divElement) {
      const object = document.createElement('img');
      object.src = item.url;
      object.style.width = '100%';
      object.style.height = '100%';
      
      // Clear previous content and append the object
      divElement.innerHTML = '';
      divElement.appendChild(object);
    }
  }

  setElementRotation(data: any) {
    const element = document.getElementById(data.id);
          element.style.transform = `rotate(${data.rotation}deg)`;
  }

}
