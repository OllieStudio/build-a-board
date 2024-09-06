import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneComponent } from './scene/scene.component';
import { PlayersComponent } from './players/players.component';
import { DockComponent } from './dock/dock.component';
import { ControlsComponent } from './controls/controls.component';
import { Componente } from '../services/interfaces/componente';
import { TestingService } from './testing.service';
import { CardComponent } from './shared/card-holder/card/card.component';
import { CardHolderComponent } from './shared/card-holder/card-holder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

export interface Player {
  items?: Componente[];
  points?: any;
  name: string;
  color: string;
  index:number;
}

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule, DragDropModule, SceneComponent, PlayersComponent, DockComponent, ControlsComponent, CardHolderComponent, CardComponent],
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})


export class TestingComponent {
  card: Componente;
  showcard: boolean;
  showhand: boolean;
  deck: Componente;

  constructor(private testing:TestingService) { 
    testing.resultEmitter.subscribe(result => {
      if(result.type === '') this.showCard(result);
      if(result.type === 'deck') this.showHand(result);
    });
  }

  showCard(result: Componente) {
    this.card = result;
    this.showcard = true;
  }
  
  showHand(result: Componente) {
    this.deck = result;
    this.showhand = true;
  }

  closeCard(){
    this.showcard = false;
    this.card = null;
  }

  closeHand(){
    this.showhand = false;
    this.deck = null;
  }

  ngOnInit(): void {
  }

}
