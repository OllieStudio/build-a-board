import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Componente } from 'src/app/services/interfaces/componente';
import { AmmountDisplayComponent } from '../../shared/ammount-display/ammount-display.component';

@Component({
  selector: 'app-control-item',
  standalone: true,
  imports: [CommonModule, AmmountDisplayComponent],
  templateUrl: './control-item.component.html',
  styleUrls: ['./control-item.component.css']
})

export class ControlItemComponent {
  @Input() isSmall:boolean;
  @Input() control:Componente;
}
