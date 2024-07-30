import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService, DatabaseService, InputBase, MaterializeService } from '@ollieestudio/fire-lib';
import { Componente } from 'src/app/services/interfaces/componente';
import { Jogo } from 'src/app/services/interfaces/jogo';
import { Upload } from 'src/app/services/interfaces/upload';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
 
  public jogoEmitter:EventEmitter<Jogo> = new EventEmitter;
  game: Jogo = {} as Jogo;
  jogoFormGroup: any;

  
  constructor(public forms:FormService, public database:DatabaseService<Jogo>, public router:Router, public material:MaterializeService) { }
  
  generateForm(form:FormGroup, fields:InputBase[]){
    form = this.forms.toFormGroup(fields);
  }
  
  setGame(game: Jogo) {
    this.game = game;
  }

  getGame(id:string){
    this.database.get(id, 'GAMES', 'default').subscribe(game =>{
      this.game = game.data();
    })
  }
  
  addDataToGame(formdata: any) {
    this.game = {...this.game, ...formdata};
    this.jogoEmitter.next(this.game);
    console.log(this.game)
  }
  
  registerForm(nextroute){
    this.database.set(this.game, 'GAMES').then(result =>{
      this.material.toast("Jogo salvo com sucesso!", 3000, 'green');
      this.router.navigateByUrl(nextroute)
    })
  }
  
  saveComponent(currentComponent: Componente) {
    currentComponent.id = currentComponent.name.toLowerCase().replace(/\s/g, '');
    this.database.set(currentComponent, 'GAMES/'+this.game.id+'/COMPONENTS').then(result =>{
      this.material.toast("Componente salvo com sucesso!", 3000, 'green');
    })
  }
 
}
