import { Component, OnInit, ViewChild } from '@angular/core';
import { GameDataService } from '../../../services/gamedata.service';
import { Route, Router } from '@angular/router';
import { StepperComponent } from 'src/app/creator/shared/stepper/stepper.component';

declare const MStepper;

@Component({
  selector: 'app-jogo-nav',
  templateUrl: './jogo-nav.component.html',
  styleUrls: ['./jogo-nav.component.css']
})
export class JogoNavComponent implements OnInit {
  @ViewChild(StepperComponent) stepper: StepperComponent;

  
  steps_sobre = [
    { label: 'Tipo do jogo', route: 'tipo' },
    { label: 'Dados do jogo', route: 'dados' },
    { label: 'Imagens', route: 'tema' },
    { label: 'Partida', route: 'partida' },
    { label: 'Dificuldade', route: 'dificuldade' },
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
    let nextRoute = this.steps_sobre[index];
    this.router.navigateByUrl('/creator/sobre/' + nextRoute.route)
  }

}
