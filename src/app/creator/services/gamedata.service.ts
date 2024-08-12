import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService, DatabaseService, InputBase, MaterializeService, QueryFn, AuthService } from '@ollieestudio/fire-lib';
import { Componente, Elemento, Texto } from 'src/app/services/interfaces/componente';
import { Jogo } from 'src/app/services/interfaces/jogo';
import { Usuario } from 'src/app/services/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  deleteProject(id: string) {
    throw new Error('Method not implemented.');
  }

  public jogoEmitter:EventEmitter<Jogo> = new EventEmitter;
  game:Jogo;
  jogoFormGroup: any;
  
  constructor(public forms:FormService, private auth:AuthService<Usuario>, public database:DatabaseService<Jogo>, public router:Router, public material:MaterializeService) { }
  
  generateForm(form:FormGroup, fields:InputBase[]){
    form = this.forms.toFormGroup(fields);
  }
  
  setGame(game: Jogo) {
    this.game = game;
  }

  getGame(id:string){
    return this.database.get(id, 'GAMES', 'default')
  }

  createGame(formdata: any){
    this.game = formdata;
    this.game.user = this.auth.User.uid;
    this.game.datacriacao = new Date().getTime();
    this.database.add(this.game, 'GAMES').then(res =>{
      this.game.id = res['id'];
      this.database.update(this.game, 'GAMES').then(res =>{
        this.jogoEmitter.next(this.game);
        this.material.toast("Jogo salvo com sucesso!", 3000, 'green');
      })
    })
  }
  
  addDataToGame(formdata: any) {
    this.game = {...this.game, ...formdata};
    if(this.game.id){
      this.database.update(this.game, 'GAMES').then(res =>{
        this.jogoEmitter.next(this.game);
        this.material.toast("Jogo salvo com sucesso!", 3000, 'green');
      })
    }else{
      this.jogoEmitter.next(this.game);
    }
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
