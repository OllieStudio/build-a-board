import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingService } from '../../testing.service';

@Component({
  selector: 'app-step-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-controls.component.html',
  styleUrls: ['./step-controls.component.css']
})
export class StepControlsComponent {

  constructor(public testing:TestingService){}

  reverseOrder(){
    this.testing.playerOrder = !this.testing.playerOrder;
  }

  nextPlayert(){
    this.testing.nextPlayer();
  }

  nextRound(){
    this.testing.nextRound();
  }
}
