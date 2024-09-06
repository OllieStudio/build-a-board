import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { Componente } from 'src/app/services/interfaces/componente';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card-holder',
  standalone: true,
  imports: [CommonModule, CardComponent, DragDropModule],
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.css']
})
export class CardHolderComponent implements OnInit{
  @Input() deck:Componente;
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
  

  ngOnInit(): void {
    
  }

 closeCards(){
  this.closeEvent.emit(true);
 }

 handleCardClosed($event){
  if( this.deck.cards.length === 0) this.closeCards(); 
 }
 
}
