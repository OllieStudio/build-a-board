import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../testing.component';

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent {
  @Input() player:Player;
  @Input() active:boolean;
}
