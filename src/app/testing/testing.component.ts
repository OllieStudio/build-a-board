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
  imports: [CommonModule, SceneComponent, PlayersComponent, DockComponent, ControlsComponent, CardHolderComponent, CardComponent],
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})


export class TestingComponent {
  card: Componente;
  showcard: boolean;
  cards: Componente[];
  showhand: boolean;

  constructor(private testing:TestingService) { 
    testing.resultEmitter.subscribe(result => {
      if(result.type === '') this.showCard(result);
    });
  }

  showCard(result: Componente) {
    this.card = result;
    this.showcard = true;
  }
  
  showHand(result: Componente[]) {
    this.cards = result;
    this.showhand = true;
  }

  closeCard(){
    this.showcard = false;
    this.card = null;
  }

  closeHand(){
    this.showhand = false;
    this.cards = null;
  }

  ngOnInit(): void {
  }

}
