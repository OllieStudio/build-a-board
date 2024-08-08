import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Componente, Elemento, Modifier, Texto } from '../../services/interfaces/componente';
import componentes_data from '../data/componentes.json';
import { Jogo } from '../../services/interfaces/jogo';
import { GameDataService } from './gamedata.service';
import { HistoryService } from './history.service';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';
import { ImageService } from './image.service';
import { UploadService } from 'src/app/services/upload.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ItemSnapshot {
  id:string;
  gameid:string;
  name: string;
  timestamp:number;
  template:string;
  background:string;
  color:string;
  zoom:number;
  elements:ElementSnapshot[];
}

export interface ElementSnapshot {
  id:string;
  name: string;
  template:string;
  background:string;
  top:number;
  left:number;
  width:number;
  height:number;
  color:string;
  font:string;
  fontsize:string;
  text:string;
}


@Injectable({
  providedIn: 'root'
})


export class CreatorUIService implements OnInit {
  public zoomValue:number = 100;
  public message: string = "";
  public closeToolbox: boolean = true;
  public componentesData: Componente[] = [];
  public game:Jogo;
  hasItemLoaded: boolean;
  modifiers: EventEmitter<Modifier[]> = new EventEmitter();
  currentComponent: Componente;
  closedrawer: boolean = true;
  isDragDisabled:boolean = false;

  constructor(private http:HttpClient, private uploads:UploadService, private imageservice:ImageService, private gamedataservice:GameDataService, private aiservice:GoogleGeminiAIService, private history:HistoryService) {
    this.componentesData  = componentes_data;
    this.game = this.gamedataservice.game;
    //console.log(this.componentesData)
   }

  ngOnInit(): void {
  }

  dropElement(event: CdkDragDrop<string[]>) {
    console.log(event);
    if ( event.previousContainer.id === "components" && event.container.id === "canvas") {
      this.addNewComponentToCanvas(event.item.data);
      this.history.addItemSnapshot(this.componenteToSnapshot(event.item.data));
    }
  }
  
  dropText(event: CdkDragDrop<string[]>) {
    console.log(event);
    if ( event.previousContainer.id === "text-container" && this.currentComponent.allowdrop) {
      this.addTextToComponent(event.item.data);
      this.history.addItemSnapshot(this.componenteToSnapshot(event.item.data));
    }
    if ( event.previousContainer.id === "svg-container" && this.currentComponent.allowdrop) {
      this.addSVGLayer(event.item.data.template, event.item.data.id);
      this.addSVGModifier(event.item.data);
      this.history.addItemSnapshot(this.componenteToSnapshot(event.item.data));
    }
    if ( event.previousContainer.id === "upload-container") {
      this.setComponentBackground(event.item.data.url);
      this.history.addItemSnapshot(this.componenteToSnapshot(event.item.data));
    }
  }

  addTextToComponent(data: Texto) {
    const container = document.getElementById('editableObject');
    //this.isDragDisabled = true;

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
     // span.style.textAlign = 'center';
     // span.style.verticalAlign = 'middle';
      span.style.display = 'flex';
      span.style.flexDirection = 'column';
      span.style.padding = '5%';

      span.style.justifyContent = 'center';
      span.style.alignItems = 'center';
      span.style.pointerEvents = 'none';
      span.style.userSelect = 'none';

      // Add CDK Drag and DragBoundary directives
    span.classList.add('cdk-drag');
    span.setAttribute('cdkDragBoundary', '#editableObject');
    span.setAttribute('cdkDrag', '');

    container.appendChild(span);
    this.addTextModifier(data);
    
    this.history.addItemSnapshot(this.componenteToSnapshot(data));
    
  }
  }

  addTextModifier(data: Texto) {
    let modifier:Modifier = {} as Modifier;
    modifier.component = this.currentComponent.id;
    modifier.type = 'text';
    modifier.property = 'text';
    modifier.title = 'Texto';
    modifier.data = data;
    this.currentComponent.modifiers.push(modifier);
    this.setModifiers(this.currentComponent);
  }

  addSVGModifier(data: Elemento) {
    let modifier:Modifier = {} as Modifier;
    modifier.component = this.currentComponent.id;
    modifier.type = 'svg';
    modifier.property = 'svg';
    modifier.title = 'Elemento';
    modifier.data = data;
    this.currentComponent.modifiers.push(modifier);
    this.setModifiers(this.currentComponent);
  }

  updateDragElement(event: CdkDragEnd<any>, data: Texto): any {
    throw new Error('Method not implemented.');
  }

  componenteToSnapshot(data: any): ItemSnapshot {
    let snapshot:ItemSnapshot = {} as ItemSnapshot;
    snapshot.id = data.id;
    snapshot.template = this.getElementTemplate();//data.template.replace(/\n/g,'') ;
    snapshot.timestamp = ~~(Date.now());
    snapshot.gameid = this.gamedataservice.game.id;
    return snapshot;
  }

  getElementTemplate(): string {
    const divElement = document.getElementById('editableObject');
    return divElement.innerHTML;
  }
  
  addNewComponentToCanvas(item:Componente) {
    this.closeToolBox();
    this.closeDrawer();
    this.hasItemLoaded = true;
    
    switch (item.type) {
      case 'SVG':
        this.placeSvgFileInDiv(item.template, 'editableObject');
        break;
        case 'PNG':
          this.placePNGinDiv(item.template);
          break;
    
          default:
          this.placeSvgInDiv(item.template, 'editableObject');
        break;
    }
    this.setModifiers(item);
  }


  placeSvgFileInDiv(template: string, arg1: string) {
    this.http.get(template, { responseType: 'text' }).subscribe(
      data => {
        this.placeSvgInDiv(data, 'editableObject');
      }
    );
  }
  
  placePNGinDiv(template: string) {
    const divElement = document.getElementById('editableObject');
    divElement.style.width = '200px';
    divElement.style.height = '200px';
    divElement.style.border = '1px solid #555';
    divElement.style.borderRadius = '20px';
    divElement.style.paddingTop = '60px';
    this.setComponentBackground(template);
  }

  setModifiers(component:Componente) {
    this.currentComponent = component;
    this.modifiers.emit(component.modifiers);
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

  closeToolBox(){
    if(!this.closeToolbox) this.closeToolbox = true;
  }

  closeDrawer() {
    if(!this.closedrawer) this.closedrawer = true;
  }

  toggleDrawer() {
    this.closedrawer = !this.closedrawer;
  }

  toggleToolbox(){
    this.closeToolbox = !this.closeToolbox;
  }

  hasItem():boolean{
    return this.hasItemLoaded;
  }

  zoomValueChange(zoomValue){
    this.zoomValue = zoomValue;
  }

  nameChange(nameValue:string){
    this.currentComponent.name = nameValue;
    this.history.addItemSnapshot(this.componenteToSnapshot(this.currentComponent));
  }

  updateItemModifier(modifier:Modifier, value:any){
    this.currentComponent[modifier.property] = value;
    switch (modifier.property) {
      case 'background': this.setComponentBackground(value);
        break;
      case 'track': this.addSVGLayer(value);
         break;
      case 'group': this.addGroupComponents(modifier, value);
         break;
       case 'color': this.setComponentColor(value);
         break;
       case 'text': this.updateTextElement(value);
        break;
       case 'svg': this.updateSVGElement(value);
        break;
      // case 'text': this.setComponentText(value)
      //   break;
      
      default:
        break;
      }
      this.history.addItemSnapshot(this.componenteToSnapshot(this.currentComponent));
    }

  updateSVGElement(data:Elemento) {
      const object = document.getElementById(data.id);
      object.style.color = data.selectedColor; 
      object.style.justifyContent = data.verticalAlign;
      object.style.alignItems = data.horizontalAlign;
      object.style.width = `${data.size}%`;
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
  
  setComponentColor(value: any) {
    const divElement = document.getElementById('editableObject');
    const obj = divElement.childNodes[0] as SVGElement;
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
  
    addSVGLayer(value: any, id?:string) {
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
    
    setComponentBackground(value: string) {
    const divElement = document.getElementById('editableObject');
    if (divElement) {
      const imgElement = document.createElement('img');
      imgElement.src = value;
      imgElement.alt = 'Background Image';
      imgElement.style.width = '100%';
      imgElement.style.height = '100%';
      imgElement.style.objectFit = 'cover';
      imgElement.style.position = 'absolute'; // Ensure the image covers the div
      imgElement.style.top = '0';
      imgElement.style.left = '0';

        divElement.childNodes[1]  ? divElement.replaceChild(imgElement, divElement.childNodes[1]) 
    : divElement.appendChild(imgElement);
    }
  }

  async saveItem(){
    await this.checkBase64Image();
    if(!this.currentComponent.name) this.currentComponent.name = this.currentComponent.title;
    if(!this.currentComponent.id) this.currentComponent.id = this.currentComponent.name.toLowerCase().replace(/\s/g, '');
    if(this.currentComponent.three?.prompt3d) this.currentComponent.three.code = await this.aiservice.textTo3D(this.describe3D(this.currentComponent))
     this.currentComponent.template = this.getElementTemplate();
     this.currentComponent.imagem = this.currentComponent['background'] || await this.imageservice.convertElementToImage(this.getHTMLElement());
     this.gamedataservice.saveComponent(this.currentComponent) ;   
  }

  getHTMLElement(): HTMLElement {
    const divElement = document.getElementById('editableObject');
    return divElement;
  }

  describe3D(currentComponent: Componente): string {
    return `${currentComponent.prompt3d} with ${currentComponent.modifiers.map(modifier => {if(currentComponent[modifier.property]) return modifier.property + ': ' + currentComponent[modifier.property]}).join(', ')}`
  }

  async checkBase64Image() {
    const divElement = document.getElementById('editableObject');
    const imgElements = divElement.getElementsByTagName('img');
  
    for (let i = 0; i < imgElements.length; i++) {
      const imgElement = imgElements[i];
      const src = imgElement.src;
      const isBase64 = src.startsWith('data:image/');
  
        if (isBase64) {
         const url = await this.imageservice.uploadImg(src, `${this.currentComponent.id}.png`, `game/${this.gamedataservice.game.titulo}/imgs/` );
         imgElement.src = url;
         this.uploads.addUpload(url, this.currentComponent, this.currentComponent.modifiers.find(modifier => modifier.property === 'background')[0]);

         if(this.currentComponent['background']) this.currentComponent['background'] = url;
        }
    }
  
  }
  
}
