import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase, FormService, MaterializeService } from '@ollieestudio/fire-lib';
import { GameDataService } from '../../../services/gamedata.service';

@Component({
  selector: 'app-jogo-tema',
  templateUrl: './jogo-tema.component.html',
  styleUrls: ['./jogo-tema.component.css']
})
export class JogoTemaComponent {
  public jogoFormGroup: FormGroup;
  pathlogo:String;
  pathheader:String;
  pathbg:String;

  private fields:InputBase[] = [
    {key:"logo", required:true},
    {key:"header", required:true},
    {key:"background", required:false},
  ]
  
  constructor(public gamedataservice:GameDataService, private forms:FormService, private material:MaterializeService) {
    this.jogoFormGroup = this.forms.toFormGroup(this.fields);
  }

  ngOnInit(): void {
    this.jogoFormGroup.patchValue(this.gamedataservice.game);
    this.material.delay(1000)
    this.material.updateTextFields();
    this.pathlogo = `game/${this.gamedataservice.game.titulo}/imgs/logo_${new Date().getTime() }.png`
    this.pathheader = `game/${this.gamedataservice.game.titulo}/imgs/header_${new Date().getTime() }.png`
    this.pathbg = `game/${this.gamedataservice.game.titulo}/imgs/bg_${new Date().getTime() }.png`
  }

  registerForm(){
    this.gamedataservice.addDataToGame(this.jogoFormGroup.getRawValue());
  }

}
