import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlItemComponent } from './control-item/control-item.component';
import { TestingService } from '../testing.service';
import { Componente, GameAction } from 'src/app/services/interfaces/componente';
import { ScriptRunnerService } from '../script-runner.service';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, ControlItemComponent],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit{

  constructor(public testing: TestingService, private runner:ScriptRunnerService){
    
  }

  ngOnInit(): void {
    this.testing.initControls();
   }

   controlSelected(control:Componente){
    this.testing.activeControl = control;
   }

   testCode(action: GameAction, mockParameters?: any[]) {
    alert(this.runner.runScript(action.code, [1, 6]));
  }
}
