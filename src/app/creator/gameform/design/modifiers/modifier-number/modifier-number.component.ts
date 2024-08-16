import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';
import { FormsModule } from '@angular/forms';
import { ModifiersService } from 'src/app/creator/services/modifiers.service';

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
  
  constructor(private modifierservice: ModifiersService){
  }

  onNumberInputChange(event: any) {
    this.modifierservice.updateItemModifier(this.modifier, event)
  }
  
}
