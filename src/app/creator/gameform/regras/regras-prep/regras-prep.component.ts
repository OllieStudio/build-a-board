import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase, FormService, MaterializeService } from '@ollieestudio/fire-lib';
import { GameDataService } from '../../../services/gamedata.service';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';

@Component({
  selector: 'app-regras-prep',
  templateUrl: './regras-prep.component.html',
  styleUrls: ['./regras-prep.component.css']
})
export class RegrasPrepComponent {
  public regrasFormGroup: FormGroup;

  private fields:InputBase[] = [
    {key:"preparacao", required:true},
    
  ]
  hidespinner: boolean = true;
  
  constructor(private aiService:GoogleGeminiAIService ,public gamedataservice:GameDataService, private forms:FormService, private material:MaterializeService) {
    this.regrasFormGroup = this.forms.toFormGroup(this.fields);
  }

  ngOnInit(): void {
    this.regrasFormGroup.patchValue(this.gamedataservice.game);
    this.material.delay(1000)
    this.material.updateTextFields();
  }

  registerForm(){
    this.gamedataservice.addDataToGame(this.regrasFormGroup.getRawValue());
  }

  async generateRules(text:string){
    this.hidespinner = false;
    const rules = await this.aiService.improveText(text,  ' correct and improve the innerText keeping the html tags');
    this.regrasFormGroup.patchValue({preparacao:rules})
    this.hidespinner = true;

  }
}
