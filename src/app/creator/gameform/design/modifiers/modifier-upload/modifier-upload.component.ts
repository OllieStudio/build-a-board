import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifiersService } from 'src/app/creator/services/modifiers.service';
import { Modifier } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-modifier-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modifier-upload.component.html',
  styleUrls: ['./modifier-upload.component.css']
})
export class ModifierUploadComponent {
  @Input() modifier:Modifier;
  selectedOption: string;
  
  constructor(private modifierservice: ModifiersService){
    this.selectedOption = '';
  }

  changeSize(event: any) {
    this.modifier.data.size = event;
    this.modifierservice.updateItemModifier(this.modifier, this.modifier.data)
  }

  changeRotation(event: any) {
    this.modifier.data.rotation = event;
    this.modifierservice.updateItemModifier(this.modifier, this.modifier.data)
  }

}
