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
    snapshot.template = data.template.replace(/\n/g,'') ;
    snapshot.timestamp = ~~(Date.now());
    snapshot.gameid = this.gamedataservice.game.id;
    return snapshot;
  }
  
  addNewComponentToCanvas(item:Componente) {
    this.closeToolBox();
    this.hasItemLoaded = true;
    
    this.placeSvgInDiv(item.template, 'editableObject');
    this.setModifiers(item);
  }

  setModifiers(component:Componente) {
    component.modifiers.forEach(element => {
      element.component = component.id;
    });
    
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
    
  }

  saveItem(){

  }
}
