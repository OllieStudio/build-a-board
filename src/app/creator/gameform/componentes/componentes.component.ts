import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Jogo } from 'src/app/services/interfaces/jogo';
import { MaterializeService, DatabaseService } from '@ollieestudio/fire-lib';
import { Componente } from 'src/app/services/interfaces/componente';
import { ItemdisplayComponent } from './itemdisplay/itemdisplay.component';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css']
})
export class ComponentesComponent implements OnInit {
  @Output() nextmitter:EventEmitter<Jogo> = new EventEmitter();
  @ViewChild(ItemdisplayComponent) display:ItemdisplayComponent;
  game:Jogo;
  showcomponents: boolean = false;
  produtos:Componente[];
  displayitem: Componente;
  items: any[] | Componente[];

  constructor(public material:MaterializeService, public database:DatabaseService<Componente>) { }

  ngOnInit() {
    this.material.initCollapsible();
    this.listProdutos();
  }

  setGame(game: Jogo) {
    this.game = game;
    this.listItems();
  }
  
  listItems() {
    this.database.listValues('GAMES/'+this.game.id+'/COMPONENTES').subscribe(list =>{
      this.items = list;
      console.log(list)
    })
  }

  listProdutos(){
    console.log('lista');
    this.database.listValues('COMPONENTES').subscribe(list =>{
      this.produtos = list;
    })
  }

  updateList(event){
    this.showcomponents = false;
    this.listItems();
  }

  addComponent(){
    this.showcomponents = !this.showcomponents;
  }

  showItem(item:Componente){
    console.log(item);
    item.quantidade = 1;
    this.displayitem = item;
  }
  
  showComponent(item:Componente){
    this.displayitem = item;
    this.display.setDiffs();
  }
}
