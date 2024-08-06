import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Componente, Modifier } from '../../services/interfaces/componente';
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
      // case 'font': this.setComponentFont(value);
      //   break;
      // case 'fontsize': this.setComponentFontSize(value);
      //   break;
      // case 'text': this.setComponentText(value)
      //   break;
      
      default:
        break;
      }
      this.history.addItemSnapshot(this.componenteToSnapshot(this.currentComponent));
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
  
    addSVGLayer(value: any) {
      const divElement = document.getElementById('editableObject');
      if (divElement) {
        const bg = divElement.childNodes[0] as HTMLElement;
        const object = document.createElement('object');
        object.data = value;
        object.style.position = 'absolute';
        object.style.top = '0';
        object.style.left = '0';
        object.style.width = '100%';
        object.style.height = '100%';
        divElement.insertBefore(object, bg);
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
    if(this.currentComponent.three?.prompt3d) this.currentComponent.three.code = await this.aiservice.textTo3D(this.describe3D(this.currentComponent))
    if(this.currentComponent.action) this.currentComponent.actioncode = await this.aiservice.textToCode(this.currentComponent.action);
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
         const url = await this.imageservice.uploadImg(src, `${this.currentComponent.classname}.png`, `game/${this.gamedataservice.game.titulo}/imgs/` );
         imgElement.src = url;
         this.uploads.addUpload(url, this.currentComponent, this.currentComponent.modifiers.find(modifier => modifier.property === 'background')[0]);

         if(this.currentComponent['background']) this.currentComponent['background'] = url;
        }
    }
  
  }
  
}
