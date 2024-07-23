import { Component } from '@angular/core';
import { GameDataService } from '../../../services/gamedata.service';

@Component({
  selector: 'app-jogo-preview',
  templateUrl: './jogo-preview.component.html',
  styleUrls: ['./jogo-preview.component.css']
})


export class JogoPreviewComponent {
  
  
  constructor(public gamedataservice:GameDataService){

  }

  registerForm(){
    this.gamedataservice.registerForm('creator/regras');
  }



}
