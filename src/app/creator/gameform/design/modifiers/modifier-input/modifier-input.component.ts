import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { Modifier } from 'src/app/services/interfaces/componente';
import { FormsModule } from '@angular/forms';

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
  
  constructor(private creator: CreatorUIService){
  }

  onKeyUp(event: any) {
    this.creator.updateItemModifier(this.modifier, event)
  }
  
}
