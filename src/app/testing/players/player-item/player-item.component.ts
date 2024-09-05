import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../testing.component';
import { ControlItemComponent } from '../../controls/control-item/control-item.component';
import { Componente } from 'src/app/services/interfaces/componente';
import { TestingService } from '../../testing.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [CommonModule, ControlItemComponent],
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent {
  @Input() player:Player;
  @Input() active:boolean;

  constructor(public testing:TestingService){}

  controlSelected(control:Componente){

  }

}
