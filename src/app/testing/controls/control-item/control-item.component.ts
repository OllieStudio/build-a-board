import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Componente } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-control-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-item.component.html',
  styleUrls: ['./control-item.component.css']
})

export class ControlItemComponent {

  @Input() control:Componente;
}
