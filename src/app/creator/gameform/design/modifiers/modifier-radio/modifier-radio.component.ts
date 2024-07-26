import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';
import { FormsModule } from '@angular/forms';
import { CreatorUIService } from 'src/app/creator/services/creator.service';

@Component({
  selector: 'app-modifier-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-radio.component.html',
  styleUrls: ['./modifier-radio.component.css']
})

export class ModifierRadioComponent {
  @Input() modifier:Modifier;
  selectedOption: string;
  
  constructor(private creator: CreatorUIService){
    this.selectedOption = '';
  }

  onOptionChange(event: any) {
    this.creator.updateItemModifier(this.modifier, event)
  }
  
}
