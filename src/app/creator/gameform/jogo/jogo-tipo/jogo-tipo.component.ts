import { Component, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase, FormService } from '@ollieestudio/fire-lib';
import { GameDataService } from '../../../services/gamedata.service';
import { Jogo } from 'src/app/services/interfaces/jogo';

@Component({
  selector: 'app-jogo-tipo',
  templateUrl: './jogo-tipo.component.html',
  styleUrls: ['./jogo-tipo.component.css']
})
export class JogoTipoComponent {
  public jogoFormGroup: FormGroup;

  private fields:InputBase[] = [
    {key:"tipo", required:true},
    
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
