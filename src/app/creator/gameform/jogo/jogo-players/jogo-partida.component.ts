import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService, InputBase } from '@ollieestudio/fire-lib';
import { GameDataService } from '../../../services/gamedata.service';

@Component({
  selector: 'app-jogo-partida',
  templateUrl: './jogo-partida.component.html',
  styleUrls: ['./jogo-partida.component.css']
})
export class JogoPartidaComponent implements OnInit {
  jogoFormGroup: FormGroup;

  private fields:InputBase[] = [
    {key:"jogadores", required:true},
    {key:"idade", required:true},
    {key:"montagem", required:true},
    {key:"partida", required:true},
   
  ]
  constructor(public gamedataservice:GameDataService, private forms:FormService) {
    this.jogoFormGroup = this.forms.toFormGroup(this.fields);
  }

  ngOnInit(): void {
    this.jogoFormGroup.patchValue(this.gamedataservice.game);
  }

  registerForm(){
    this.gamedataservice.addDataToGame(this.jogoFormGroup.getRawValue());
  }
}
