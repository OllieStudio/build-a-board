import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { Modifier } from 'src/app/services/interfaces/componente';
import { ModifierRadioComponent } from '../modifier-radio/modifier-radio.component';
import { ModifierImageComponent } from '../modifier-image/modifier-image.component';
import { ModifierInputComponent } from '../modifier-input/modifier-input.component';
import { ModifierNumberComponent } from '../modifier-number/modifier-number.component';
import { ModifierColorComponent } from '../modifier-color/modifier-color.component';
import { ModifierTextComponent } from '../modifier-text/modifier-text.component';
import { ModifierSvgComponent } from '../modifier-svg/modifier-svg.component';
import { ModifierActionsComponent } from '../modifier-actions/modifier-actions.component';
import { ModifiersService } from 'src/app/creator/services/modifiers.service';
import { ModifierUploadComponent } from '../modifier-upload/modifier-upload.component';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [CommonModule, ModifierUploadComponent, ModifierActionsComponent, ModifierSvgComponent, ModifierTextComponent, ModifierColorComponent, ModifierRadioComponent, ModifierImageComponent, ModifierInputComponent, ModifierNumberComponent],
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent {
  @Input() modifier:Modifier;
  show: boolean = false;
  
  constructor(private modifiers:ModifiersService){
  }

  toggle(){
    this.show = !this.show;
  }

  enableControls():boolean{
    return (this.modifier.type === 'image' && this.modifier.property === 'track') || this.modifier.type === 'upload' || this.modifier.type === 'text' || this.modifier.type === 'svg';
  }

  deleteModifier(){
    this.modifiers.deleteModifier(this.modifier);
  }


}
