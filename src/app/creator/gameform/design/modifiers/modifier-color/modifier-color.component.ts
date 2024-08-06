import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';
import { FormsModule } from '@angular/forms';
import { CreatorUIService } from 'src/app/creator/services/creator.service';

@Component({
  selector: 'app-modifier-color',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-color.component.html',
  styleUrls: ['./modifier-color.component.css']
})

export class ModifierColorComponent {
  @Input() modifier:Modifier;
  color: string = '';
  limitOptions: boolean = false;
  colorOptions: string[];
  
  constructor(private creator: CreatorUIService){
  }


  ngOnInit() {
    this.colorOptions = this.modifier.options;
    this.limitOptions = this.modifier.options?.length > 0;
    if (this.limitOptions) {
      this.color = this.modifier.options[0];
    }
  }

  onColorChange(newColor: string) {
    this.color = newColor;
    this.creator.updateItemModifier(this.modifier, newColor);
  }
  
}
