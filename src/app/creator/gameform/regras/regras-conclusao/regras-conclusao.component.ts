import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase, FormService, MaterializeService } from '@ollieestudio/fire-lib';
import { GameDataService } from '../../../services/gamedata.service';

@Component({
  selector: 'app-regras-conclusao',
  templateUrl: './regras-conclusao.component.html',
  styleUrls: ['./regras-conclusao.component.css']
})
export class RegrasConclusaoComponent {
  public regrasFormGroup: FormGroup;

  private fields:InputBase[] = [
    {key:"vencedor", required:true},
  ]
  
  constructor(public gamedataservice:GameDataService, private forms:FormService, private material:MaterializeService) {
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
}
