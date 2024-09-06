import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { Componente } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-card-holder',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.css']
})
export class CardHolderComponent {
 @Input() cards:Componente[];
 @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();


 closeCards(){

 }
}
