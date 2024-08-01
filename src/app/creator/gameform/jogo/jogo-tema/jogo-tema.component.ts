import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase, FormService, MaterializeService } from '@ollieestudio/fire-lib';
import { GameDataService } from '../../../services/gamedata.service';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';
import { VertexAIService } from 'src/app/services/google-vertex-ai.service';

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
  
  constructor(private vertex:VertexAIService, private aiservice:GoogleGeminiAIService, public gamedataservice:GameDataService, private forms:FormService, private material:MaterializeService) {
    this.jogoFormGroup = this.forms.toFormGroup(this.fields);
  }

  ngOnInit(): void {
    this.jogoFormGroup.patchValue(this.gamedataservice.game);
    this.material.delay(1000)
    this.material.updateTextFields();
    this.pathlogo = `game/${this.gamedataservice.game.titulo}/imgs/logo_`
    this.pathheader = `game/${this.gamedataservice.game.titulo}/imgs/header_`
    this.pathbg = `game/${this.gamedataservice.game.titulo}/imgs/bg_`
  }

  registerForm(){
    this.gamedataservice.addDataToGame(this.jogoFormGroup.getRawValue());
  }

  async generateLogo(prompt){
    //const logo = await this.aiservice.textToSVG(prompt, '300x300px logo');
    const logo = await this.vertex.generateImage('a clipart style logo with transparent background and ' + prompt);
    this.jogoFormGroup.patchValue({logo:logo})
  }

  async generateHeader(prompt){
    const header = await this.vertex.generateImage('a 16:9 header with ' + prompt);
    this.jogoFormGroup.patchValue({header:header})
  }

  async generateBg(prompt){
    const bg = await this.vertex.generateImage('a 1:1 background image with ' + prompt);
    this.jogoFormGroup.patchValue({background:bg})
  }

}
