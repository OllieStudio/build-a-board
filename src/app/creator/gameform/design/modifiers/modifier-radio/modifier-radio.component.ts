import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';
import { FormsModule } from '@angular/forms';
import { ModifiersService } from 'src/app/creator/services/modifiers.service';

@Component({
  selector: 'app-modifier-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-radio.component.html',
  styleUrls: ['./modifier-radio.component.css']
})

export class ModifierRadioComponent implements OnInit {
  @Input() modifier:Modifier;
  selectedOption: string;
  
  constructor(private modifierservice: ModifiersService){
  }
  
  ngOnInit(): void {
    this.selectedOption = this.modifier.options[0];
  }

  onOptionChange(event: any) {
    this.modifierservice.updateItemModifier(this.modifier, event)
  }
  
}
