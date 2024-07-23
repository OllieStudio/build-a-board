import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Componente } from 'src/app/services/interfaces/componente';
import { DatabaseService } from '@ollieestudio/fire-lib';
import { Jogo } from 'src/app/services/interfaces/jogo';
import { NumericstepperComponent } from 'src/app/creator/ui/numericstepper/numericstepper.component';

@Component({
  selector: 'app-itemdisplay',
  templateUrl: './itemdisplay.component.html',
  styleUrls: ['./itemdisplay.component.css']
})
export class ItemdisplayComponent implements OnInit {
  @ViewChild(NumericstepperComponent, { static: true }) stepper:NumericstepperComponent;
  @Output() updateList:EventEmitter<boolean> = new EventEmitter();
  @Input() item:Componente;
  @Input() game:Jogo;
  changed: boolean;

  constructor(public database:DatabaseService<Componente>) { }

  ngOnInit(): void {
  
  }
  
  setImg(img){
    this.item.imagem = img;
  }
  
  updateComponente(item){
    this.database.update(item, 'GAMES/'+ this.game.id+'/COMPONENTES').then(result =>{
      this.item = null;
      this.updateList.next(true);
    })
  }
  
  addComponente(item){
    this.database.add(item, 'GAMES/'+ this.game.id+'/COMPONENTES').then(result =>{
      this.updateList.next(true);
      this.item = null;
    })
  }
 
  removeComponente(item){
    this.database.delete(item, 'GAMES/'+ this.game.id+'/COMPONENTES').then(result =>{
      this.updateList.next(true);
      this.item = null;
    })
  }

  setDiffs(){
    this.changed = false;
  }

  getChanged(event){
    this.changed = event;
  }
  
}
