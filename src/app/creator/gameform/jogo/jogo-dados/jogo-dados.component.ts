import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService, InputBase, MaterializeService } from '@ollieestudio/fire-lib';
import { GameDataService } from '../../../services/gamedata.service';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';

@Component({
  selector: 'app-jogo-dados',
  templateUrl: './jogo-dados.component.html',
  styleUrls: ['./jogo-dados.component.css']
})
export class JogoDadosComponent implements OnInit {
  public jogoFormGroup: FormGroup;

  private fields:InputBase[] = [
    {key:"titulo", required:true},
    {key:"subtitulo", required:true},
    {key:"sinopse", required:true},
    
  ]
  
  constructor(private aiService:GoogleGeminiAIService, public gamedataservice:GameDataService, private forms:FormService, private material:MaterializeService) {
    this.jogoFormGroup = this.forms.toFormGroup(this.fields);
  }

  ngOnInit(): void {
    this.jogoFormGroup.patchValue(this.gamedataservice.game);
    this.material.delay(1000)
    this.material.updateTextFields();
  }

  async generateSinopsis(text:string){
    const sinopsis = await this.aiService.improveText(text, '1 paragraph sinopsis');
    this.jogoFormGroup.patchValue({sinopse:sinopsis})
  }

  registerForm(){
    this.gamedataservice.addDataToGame(this.jogoFormGroup.getRawValue());
  }

}
