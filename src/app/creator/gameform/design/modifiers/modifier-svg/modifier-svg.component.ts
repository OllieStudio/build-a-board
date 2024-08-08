import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { Modifier } from 'src/app/services/interfaces/componente';
import { TextEditorComponent } from 'src/app/creator/shared/text-editor/text-editor.component';
import { AlignSelectorComponent } from 'src/app/creator/shared/align-selector/align-selector.component';

@Component({
  selector: 'app-modifier-svg',
  standalone: true,
  imports: [CommonModule, TextEditorComponent, AlignSelectorComponent],
  templateUrl: './modifier-svg.component.html',
  styleUrls: ['./modifier-svg.component.css']
})
export class ModifierSvgComponent {
  @Input() modifier:Modifier;
  selectedOption: string;
  
  constructor(private creator: CreatorUIService){
    this.selectedOption = '';
  }

  onSVGChange(event: any) {
    this.modifier.data = {...this.modifier.data, ...event};
    this.creator.updateItemModifier(this.modifier, {id: this.modifier.data.id, ...event})
  }

  onVerticalChange($event){
    this.modifier.data.verticalAlign = $event;
    this.creator.updateItemModifier(this.modifier, this.modifier.data);
  }

  onHorizontalChange($event){
    this.modifier.data.horizontalAlign = $event;
    this.creator.updateItemModifier(this.modifier, this.modifier.data);
  }
  
}
