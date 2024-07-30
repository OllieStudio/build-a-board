import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Componente, Modifier } from '../../services/interfaces/componente';
import componentes_data from '../data/componentes.json';
import { Jogo } from '../../services/interfaces/jogo';
import { GameDataService } from './gamedata.service';
import { HistoryService } from './history.service';

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

  constructor(private gamedataservice:GameDataService, private history:HistoryService) {
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
    this.hasItemLoaded = true;
    
    this.placeSvgInDiv(item.template, 'editableObject');
    this.setModifiers(item);
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
    this.closeToolbox = !this.closeToolbox;
  }

  hasItem():boolean{
    return this.hasItemLoaded;
  }

  zoomValueChange(zoomValue){
    this.zoomValue = zoomValue;
  }

  nameChange(nameValue:string){
    this.currentComponent['name'] = nameValue;
    this.history.addItemSnapshot(this.componenteToSnapshot(this.currentComponent));
  }

  updateItemModifier(modifier:Modifier, value:any){
    this.currentComponent[modifier.property] = value;
    switch (modifier.property) {
      case 'background': this.setComponentBackground(value);
        break;
      case 'track': this.addSVGLayer(value);
         break;
      // case 'color': this.setComponentColor(value);
      //   break;
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
      const object = divElement.childNodes[0] as HTMLElement;
      object.style.background = `url(${value}) center / cover no-repeat`;
      
      // if(value.startsWith('data:image/svg+xml;')){
      //   const newElement = document.createElement('img');
      //   newElement.src = value;
      //   // newElement.type = 'image/svg+xml';
      //   divElement.replaceChild(newElement, object)
      // }else{
      // }
    }
  }

  saveItem(){
    
  }
}
