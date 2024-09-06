import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Componente } from 'src/app/services/interfaces/componente';
import { TestingService } from 'src/app/testing/testing.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
    @Input() isSmall:boolean;
    @Input() closed:boolean = true;
    @Input() deck:Componente;
    @Input() card:Componente;
    @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();

    constructor(public testing:TestingService){

    }

    dropCard(){
      this.closeEvent.emit(true);
      if(this.deck) this.deck['cards'] = this.deck['cards'].filter(card => card.name !== this.card.name);
      this.testing.dropCard(this.card);
    }

    setVisible(){
      this.testing.setCardVisible(this.card);
      this.closeEvent.emit(true);
    }

    addToHand(){
      this.testing.addCardToHand(this.card);
      this.closeEvent.emit(true);
    }

    discard(){
      const deck = this.testing.decks.find(deck => deck.name === this.deck?.name)
      this.testing.discardCardToDeck(this.card, deck);
      this.closeEvent.emit(true);
    }
  }

