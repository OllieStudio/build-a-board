import { Injectable, OnInit } from '@angular/core';
import { Componente } from '../../services/interfaces/componente';
import componentes_data from '../data/componentes.json';
import { ElementsService } from './elements.service';

export interface ItemSnapshot {
  data: Componente;
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

  public componentesData: Componente[] = [];
  hasItemLoaded: boolean;

  constructor(private elements:ElementsService) {
    this.componentesData = componentes_data;
  }

  ngOnInit(): void {
   
  }


  hasItem():boolean{
    return this.hasItemLoaded;
  }

  zoomValueChange(zoomValue){
    this.zoomValue = zoomValue;
  }

}
