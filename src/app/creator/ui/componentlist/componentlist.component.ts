import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Componente } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-componentlist',
  templateUrl: './componentlist.component.html',
  styleUrls: ['./componentlist.component.css']
})
export class ComponentlistComponent implements OnInit {
  @Input() lista:Componente[] = [];
  @Input()  categoria:string;
  @Input()  action:string;
  @Output() showItem:EventEmitter<Componente> = new EventEmitter();

  items:Componente[] = [];

  constructor() { }

  ngOnInit(): void {
    if(!this.categoria) {
      this.items = this.lista;
    }else{
      this.items = this.lista.filter((item) => {return item.categoria === this.categoria;})  
    }
  }

  showItemFn(item:Componente){
    item.action = this.action;
    this.showItem.next(item);
  }
}
