import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ammount-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ammount-display.component.html',
  styleUrls: ['./ammount-display.component.css']
})
export class AmmountDisplayComponent {
@Input() size:string;
@Input() ammount:number;
}
