import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-modifier-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modifier-radio.component.html',
  styleUrls: ['./modifier-radio.component.css']
})
export class ModifierRadioComponent {
  @Input() modifier:Modifier;
  
}
