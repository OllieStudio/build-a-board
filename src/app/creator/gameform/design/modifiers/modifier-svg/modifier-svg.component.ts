import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';
import { TextEditorComponent } from 'src/app/creator/shared/text-editor/text-editor.component';
import { AlignSelectorComponent } from 'src/app/creator/shared/align-selector/align-selector.component';
import { ModifiersService } from 'src/app/creator/services/modifiers.service';
import { FormsModule } from '@angular/forms';
import { RotationEditorComponent } from 'src/app/creator/shared/rotation-editor/rotation-editor.component';

@Component({
  selector: 'app-modifier-svg',
  standalone: true,
  imports: [CommonModule, TextEditorComponent, AlignSelectorComponent, FormsModule, RotationEditorComponent],
  templateUrl: './modifier-svg.component.html',
  styleUrls: ['./modifier-svg.component.css']
})
export class ModifierSvgComponent {
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

  onVerticalChange($event){
    this.modifier.data.verticalAlign = $event;
    this.modifierservice.updateItemModifier(this.modifier, this.modifier.data);
  }

  changeColor($event){
    this.modifierservice.updateItemModifier(this.modifier, this.modifier.data);
  }

  onHorizontalChange($event){
    this.modifier.data.horizontalAlign = $event;
    this.modifierservice.updateItemModifier(this.modifier, this.modifier.data);
  }
  
}
