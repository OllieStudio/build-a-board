import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlItemComponent } from './control-item/control-item.component';
import { TestingService } from '../testing.service';
import { Componente, GameAction } from 'src/app/services/interfaces/componente';
import { ScriptRunnerService } from '../script-runner.service';
import { MaterializeService } from '@ollieestudio/fire-lib';
import { RegrasPreviewComponent } from 'src/app/creator/gameform/regras/regras-preview/regras-preview.component';
import { CreatorModule } from 'src/app/creator/creator.module';
import { StepControlsComponent } from './step-controls/step-controls.component';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, ControlItemComponent, CreatorModule, StepControlsComponent],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit{
  steps_regras = [
    { label: 'Objetivo', route: 'objetivo' },
    { label: 'Preparação', route: 'prepara' },
    { label: 'Regras Básicas', route: 'basico' },
    { label: 'Durante a Partida', route: 'partida' },
    { label: 'Vencedor / Conclusão', route: 'vencedor' },
    { label: 'Resumo', route: 'resumo' }
    ]
  tabs: any;
  constructor(public testing: TestingService, private runner:ScriptRunnerService, private materialize:MaterializeService){
    
  }

  ngOnInit(): void {
    // this.testing.initControls();
    this.materialize.initModal('#modalrules');
  }

   controlSelected(control:Componente){
    this.testing.activeControl = control;
   }

   testCode(action: GameAction, mockParameters?: any[]) {
    alert(this.runner.runScript(action.code, [1, 6]));
  }

  async openRules(){
    this.materialize.openModal('#modalrules');
    await this.materialize.delay(2000);
    this.materialize.initTabs();
  }

  getTab(rule:string){
    const tab = this.materialize.getTab('.tabs');
    tab.select(rule);
  }
}
