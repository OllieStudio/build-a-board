import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';
import { TextEditorComponent } from 'src/app/creator/shared/text-editor/text-editor.component';
import { AlignSelectorComponent } from 'src/app/creator/shared/align-selector/align-selector.component';
import { ModifiersService } from 'src/app/creator/services/modifiers.service';

@Component({
  selector: 'app-modifier-text',
  standalone: true,
  imports: [CommonModule, TextEditorComponent, AlignSelectorComponent],
  templateUrl: './modifier-text.component.html',
  styleUrls: ['./modifier-text.component.css']
})
export class ModifierTextComponent {
  @Input() modifier:Modifier;
  selectedOption: string;
  
  constructor(private modifierservice: ModifiersService){
    this.selectedOption = '';
  }

  onTextChange(event: any) {
    this.modifier.data = {...this.modifier.data, ...event};
    this.modifierservice.updateItemModifier(this.modifier, {id: this.modifier.data.id, ...event})
  }

  changeRotation(event: any) {
    this.modifier.data.rotation = event;
    this.modifierservice.updateItemModifier(this.modifier, this.modifier.data)
  }

  onVerticalChange($event){
    this.modifier.data.verticalAlign = $event;
    this.modifierservice.updateItemModifier(this.modifier, this.modifier.data);
  }

  onHorizontalChange($event){
    this.modifier.data.horizontalAlign = $event;
    switch ($event) {
      case 'start':
        this.modifier.data.textAlign = 'left';
        break;
      case 'center':
        this.modifier.data.textAlign = 'center';
        break;
      case 'end':
        this.modifier.data.textAlign = 'right';
        break;
    }
    
    this.modifierservice.updateItemModifier(this.modifier, this.modifier.data);
  }
  
}
