import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../testing.component';
import { TestingService } from '../testing.service';
import { PlayerItemComponent } from './player-item/player-item.component';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, PlayerItemComponent],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  constructor(public testing:TestingService){}
  
  ngOnInit(): void {
   this.testing.initPlayers();
  }
}
