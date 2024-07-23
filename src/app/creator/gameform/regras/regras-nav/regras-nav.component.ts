import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StepperComponent } from 'src/app/creator/shared/stepper/stepper.component';
import { GameDataService } from '../../../services/gamedata.service';

@Component({
  selector: 'app-regras-nav',
  templateUrl: './regras-nav.component.html',
  styleUrls: ['./regras-nav.component.css']
})
export class RegrasNavComponent {
  @ViewChild(StepperComponent) stepper: StepperComponent;

  
  steps_regras = [
    { label: 'Objetivo', route: 'objetivo' },
    { label: 'Preparação', route: 'prepara' },
    { label: 'Regras Básicas', route: 'basico' },
    { label: 'Durante a Partida', route: 'partida' },
    { label: 'Vencedor / Conclusão', route: 'vencedor' },
    { label: 'Resumo', route: 'resumo' }
    ]

  constructor(public gamedataservice:GameDataService, private router:Router){

  }

  ngOnInit() {
    this.gamedataservice.jogoEmitter.subscribe(jogo =>{
     this.stepper.nextStep();
    })
   
  }

  nextStep(index){
    let nextRoute = this.steps_regras[index];
    this.router.navigateByUrl('/creator/regras/' + nextRoute.route)
  }
}
