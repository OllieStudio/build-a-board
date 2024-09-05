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
import { AmmountDisplayComponent } from '../shared/ammount-display/ammount-display.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, DragDropModule, ControlItemComponent, CreatorModule, StepControlsComponent, AmmountDisplayComponent],
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
  showResult:boolean = false;
  result:any;
  constructor(public testing: TestingService, private materialize:MaterializeService){
    
  }

  ngOnInit(): void {
    // this.testing.initControls();
    this.materialize.initModal('#modalrules');
  }

   controlSelected(control:Componente){
    this.testing.getControl(control);
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
