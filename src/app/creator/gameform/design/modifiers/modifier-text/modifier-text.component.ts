import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { Modifier } from 'src/app/services/interfaces/componente';
import { TextEditorComponent } from 'src/app/creator/shared/text-editor/text-editor.component';

@Component({
  selector: 'app-modifier-text',
  standalone: true,
  imports: [CommonModule, TextEditorComponent],
  templateUrl: './modifier-text.component.html',
  styleUrls: ['./modifier-text.component.css']
})
export class ModifierTextComponent {
  @Input() modifier:Modifier;
  selectedOption: string;
  
  constructor(private creator: CreatorUIService){
    this.selectedOption = '';
  }

  onTextChange(event: any) {
    this.modifier.data = {...this.modifier.data, ...event};
    this.creator.updateItemModifier(this.modifier, {id: this.modifier.data.id, ...event})
  }
  
}
