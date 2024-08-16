import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';
import { FormsModule } from '@angular/forms';
import { ModifiersService } from 'src/app/creator/services/modifiers.service';

@Component({
  selector: 'app-modifier-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-input.component.html',
  styleUrls: ['./modifier-input.component.css']
})
export class ModifierInputComponent {
  @Input() modifier:Modifier;
  textInput: string;
  
  constructor(private modifierservice: ModifiersService){
  }

  onKeyUp(event: any) {
    this.modifierservice.updateItemModifier(this.modifier, event)
  }
  
}
