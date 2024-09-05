import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../testing.component';
import { TestingService } from '../testing.service';
import { PlayerItemComponent } from './player-item/player-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, PlayerItemComponent, DragDropModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  constructor(public testing:TestingService){}
  
  ngOnInit(): void {
  //  this.testing.initPlayers();
  }

  onDragEnter() {
    // Apply the effect when the drag item enters the list
    console.log('entered')
  }
  
  onDragExit() {
  console.log('exited')
    // Remove or change the effect when the drag item exits the list
  }
}
