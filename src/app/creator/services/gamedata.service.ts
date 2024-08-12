import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService, DatabaseService, InputBase, MaterializeService, QueryFn } from '@ollieestudio/fire-lib';
import { Componente, Elemento, Texto } from 'src/app/services/interfaces/componente';
import { Jogo } from 'src/app/services/interfaces/jogo';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  public jogoEmitter:EventEmitter<Jogo> = new EventEmitter;
  game:Jogo;
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

  saveText(text: Texto) {
    text.id = text.content.toLowerCase().replace(/\s/g, '').substring(0, 15);
    this.database.set(text, 'GAMES/'+this.game.id+'/TEXTS').then(result =>{
      this.material.toast("Texto salvo com sucesso!", 3000, 'green');
    })
  }

   removeText(texto: Texto) {
    this.database.delete(texto, 'GAMES/'+this.game.id+'/TEXTS')
  }

  getComponents() {
    return this.database.listValues('GAMES/'+this.game.id+'/COMPONENTS');
  }

    removeComponent(component: Componente) {
      this.database.delete(component, 'GAMES/'+this.game.id+'/COMPONENTS')
  }
  
  getTexts() {
    return this.database.listValues('GAMES/'+this.game.id+'/TEXTS');
  }

  getElements() {
    return this.database.listValues('GAMES/'+this.game.id+'/ELEMENTS');
    }
    
  getCommonElements() {
    return this.database.listValues('ELEMENTS');
    }

    listProjects(user:string) {
      let query: QueryFn = ref => ref.where('user', '==', user);
      return this.database.queryValues('GAMES', query);
    }
 
  saveElemento(elem: Elemento) {
    // this.database.set(elem, 'GAMES/'+this.game.id+'/TEXTS').then(result =>{
    this.database.set(elem, 'ELEMENTS').then(result =>{
      this.material.toast("Elemento salvo com sucesso!", 3000, 'green');
    })
    }
}
