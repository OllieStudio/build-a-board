import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { ModifierComponent } from '../modifier/modifier.component';

@Component({
  selector: 'app-modifiers-panel',
  standalone: true,
  imports: [CommonModule, ModifierComponent],
  templateUrl: './modifiers-panel.component.html',
  styleUrls: ['./modifiers-panel.component.css']
})
export class ModifiersPanelComponent {
  modifiers:any[];
  
  constructor(public creator:CreatorUIService){
   this.creator.modifiers.subscribe(event => this.modifiers = event);
  }
}
