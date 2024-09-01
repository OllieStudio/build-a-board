import { EventEmitter, Injectable } from '@angular/core';
import { Componente, Modifier } from 'src/app/services/interfaces/componente';
import { HistoryService } from './history.service';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';
import { GameDataService } from './gamedata.service';
import { ImageService } from './image.service';
import { UploadService } from 'src/app/services/upload.service';
import componentes_data from '../data/componentes.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  currentComponent: Componente;
  componentesData: Componente[];
  componentEmitter: EventEmitter<Componente> = new EventEmitter();

  constructor(private http:HttpClient, private uploads: UploadService, private aiservice: GoogleGeminiAIService, private imageservice: ImageService, private gamedataservice: GameDataService) { 
    this.componentesData = componentes_data;
  }

  nameChange(nameValue: string) {
    this.currentComponent.name = nameValue;
    this.componentEmitter.emit(this.currentComponent);
  }

  async saveItem() {
    await this.checkBase64Image();
    if (!this.currentComponent.name) this.currentComponent.name = this.currentComponent.title;
    if (!this.currentComponent.id) this.currentComponent.id = this.currentComponent.name.toLowerCase().replace(/\s/g, '');
    if (this.currentComponent.three?.prompt3d) this.currentComponent.three.code = await this.aiservice.textTo3D(this.describe3D(this.currentComponent))
    this.currentComponent.template = this.getTemplate();
    await this.imageservice.convertChildNodesToImage(this.getHTMLElement());
    const image = await this.imageservice.convertElementToImage(this.getHTMLElement()) || this.currentComponent['background'];
    const url = await this.imageservice.uploadImg(image, `template-${this.currentComponent.name}.png`, `game/${this.gamedataservice.game.id}/imgs/`);
    this.currentComponent.imagem = url;
    this.gamedataservice.saveComponent(this.currentComponent);
  }

  setComponentBackground(value: string) {
    const divElement = document.getElementById('background-img') as HTMLImageElement;
    if(value){
      divElement.src = value;
    }else{
      divElement.removeAttribute('src');
    } 
  }

  async addGroupComponents(modifier: Modifier, value: any) {
    if(confirm(`Deseja adicionar ${value} ${modifier.multiple} ao grupo ${this.currentComponent.name}?`)){
      const element = this.componentesData.find(el => el.id === modifier.multiple);
      element.imagem = element.template;

      for (let index = 0; index < value; index++) {
        element['group'] = this.currentComponent.name;
        element.name = modifier.multiple + '-' + index;
        this.gamedataservice.saveComponent(element);
      }
    }
  }

  addComponent(item: Componente) {
    if(this.currentComponent) this.resetComponent();
    this.currentComponent = item;

    switch (item.type) {
      case 'SVG':
        this.addSvgFileComponent(item.template);
        break;
      case 'PNG':
        this.addImageComponent(item.template);
        break;
      default:
        this.placeSvgComponent(item.template);
        break;
    }
     this.componentEmitter.emit(this.currentComponent);
  }

  resetComponent() {
    this.currentComponent = null;
    this.setComponentBackground(null);
    this.componentEmitter.emit(null);
    const element = document.getElementById('editableObject');
    const children = Array.from(element.childNodes);
    element.innerHTML = '';
    children.slice(children.length > 2 ? 1 : 0).forEach(child => element.appendChild(child));

  }

  placeSvgComponent(svgFileUrl: string): void {
    const divElement = document.getElementById('editableObject');

    if (divElement) {
      const children = Array.from( divElement.childNodes);
      const svgElement = document.createElement('object');
      svgElement.data = svgFileUrl;
      svgElement.type = 'image/svg+xml';

      //divElement.appendChild(svgElement);
      divElement.innerHTML = svgFileUrl;
      children.forEach(child => {
        divElement.appendChild(child);
      })
    }
  }

  loadComponent(componente: Componente) {
    if(this.currentComponent) this.resetComponent();
    this.currentComponent = componente;
    const divElement = document.getElementById('editableObject');
    if (divElement) {
      // Create a temporary container to parse the template string
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = componente.template.trim();
  
      // Get the root element from the parsed template
      const rootElement = tempDiv.firstElementChild;
  
      // Insert the root element before the existing child nodes
      if (rootElement) {
        divElement.insertBefore(rootElement, divElement.firstChild);
      }
    }
    this.setComponentBackground(componente['background']);
    this.componentEmitter.emit(this.currentComponent);
  }

  addSvgFileComponent(template: string) {
    this.http.get(template, { responseType: 'text' }).subscribe(
      data => {
        this.placeSvgComponent(data);
      }
    );
  }

  addImageComponent(template: string) {
    this.setComponentBackground(template);
  }


  getTemplate(): string {
    const divElement = document.getElementById('editableObject');
    return divElement.innerHTML;
  }

  getHTMLElement(): HTMLElement {
    const divElement = document.getElementById('editableObject');
    return divElement;
  }

  describe3D(currentComponent: Componente): string {
    const prompt = `${currentComponent.three?.prompt3d} with ${currentComponent.modifiers.map(modifier => { if (currentComponent[modifier.property]) return modifier.property + ': ' + currentComponent[modifier.property] }).join(', ')}`
    console.log(prompt);
    return prompt
  }

  async checkBase64Image() {
    const divElement = document.getElementById('editableObject');
    const imgElements = divElement.getElementsByTagName('img');

    for (let i = 0; i < imgElements.length; i++) {
      const imgElement = imgElements[i];
      const src = imgElement.src;
      const isBase64 = src.startsWith('data:image/');

      if (isBase64) {
        const url = await this.imageservice.uploadImg(src, `${this.currentComponent.id}.png`, `game/${this.gamedataservice.game.id}/imgs/`);
        imgElement.src = url;
        this.uploads.addUpload(url, this.currentComponent, this.currentComponent.modifiers.find(modifier => modifier.property === 'background')[0]);

        if (this.currentComponent['background']) this.currentComponent['background'] = url;
      }
    }

  }
}
