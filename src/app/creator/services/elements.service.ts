import { Injectable } from '@angular/core';
import { Elemento, Texto } from 'src/app/services/interfaces/componente';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
addedElements:Elemento[];

  constructor() { }


  addTextElement(data: Texto) {
    const container = document.getElementById('editableObject');

    if (container) {
      const span = document.createElement('span');
      span.textContent = data.content;
      span.id = data.id;
      span.style.fontFamily = data.selectedFont;
      span.style.fontSize = data.selectedSize + 'px';
      span.style.fontStyle = data.selectedStyle;
      span.style.color = data.selectedColor;

      span.style.position = 'absolute';
      span.style.top = '0';
      span.style.left = '0';
      span.style.width = '100%';
      span.style.height = '100%';
      span.style.display = 'flex';
      span.style.flexDirection = 'column';
      span.style.padding = '5%';

      span.style.justifyContent = 'center';
      span.style.alignItems = 'center';
      span.style.pointerEvents = 'none';
      span.style.userSelect = 'none';

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

  addSvgElement(value: any, id?: string) {
    const divElement = document.getElementById('editableObject');
    if (divElement) {

      const object = document.createElement('object');
      object.data = value;
      object.style.width = '50%';
      object.style.height = 'auto';

      const div = document.createElement('div');
      div.id = id;
      div.style.position = 'absolute';
      div.style.top = '0';
      div.style.left = '0';
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
      div.style.padding = '5%';
      div.style.justifyContent = 'center';
      div.style.alignItems = 'center';
      div.style.pointerEvents = 'none';
      div.style.userSelect = 'none';

      div.append(object);
      divElement.appendChild(div);
    }
  }

  updateSVGElement(data:Elemento) {
    const object = document.getElementById(data.id);
    object.style.color = data.selectedColor; 
    object.style.justifyContent = data.verticalAlign;
    object.style.alignItems = data.horizontalAlign;
    object.style.width = `${data.size}%`;
}

  setElementColor(value: any, id) {
    const obj = document.getElementById(id) as unknown as SVGElement;
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
  }

  addImageElement(data: any) {
    throw new Error('Method not implemented.');
  }


}
