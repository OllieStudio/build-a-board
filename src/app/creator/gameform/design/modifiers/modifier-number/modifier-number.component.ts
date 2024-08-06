import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { Modifier } from 'src/app/services/interfaces/componente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-number',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-number.component.html',
  styleUrls: ['./modifier-number.component.css']
})
export class ModifierNumberComponent {
  @Input() modifier:Modifier;
  numberInput: number = 1;
  
  constructor(private creator: CreatorUIService){
  }

  onNumberInputChange(event: any) {
    this.creator.updateItemModifier(this.modifier, event)
  }
  
}
