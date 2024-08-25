import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { ModifierComponent } from '../modifier/modifier.component';
import { Modifier } from 'src/app/services/interfaces/componente';
import { ModifiersService } from 'src/app/creator/services/modifiers.service';

@Component({
  selector: 'app-modifiers-panel',
  standalone: true,
  imports: [CommonModule, ModifierComponent],
  templateUrl: './modifiers-panel.component.html',
  styleUrls: ['./modifiers-panel.component.css']
})
export class ModifiersPanelComponent {
  modifiers:Modifier[];
  
  constructor(public modifierservice:ModifiersService, private cdr: ChangeDetectorRef){
   this.modifierservice.modifiers.subscribe(event => {
    this.modifiers = [];
    if(event) this.modifiers = event;
    this.cdr.detectChanges();
    });
  }
}
