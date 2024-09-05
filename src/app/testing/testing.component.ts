import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneComponent } from './scene/scene.component';
import { PlayersComponent } from './players/players.component';
import { DockComponent } from './dock/dock.component';
import { ControlsComponent } from './controls/controls.component';
import { Componente } from '../services/interfaces/componente';

export interface Player {
  items?: Componente[];
  points?: any;
  name: string;
  color: string;
  index:number;
}

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule, SceneComponent, PlayersComponent, DockComponent, ControlsComponent],
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})


export class TestingComponent {

}
