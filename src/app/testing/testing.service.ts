import { EventEmitter, Injectable } from '@angular/core';
import { ThreeService } from './three-js.service';
import { GameDataService } from '../creator/services/gamedata.service';
import { Player } from './testing.component';
import { Componente, GameAction } from '../services/interfaces/componente';
import { findIndex, firstValueFrom } from 'rxjs';
import { ScriptRunnerService } from './script-runner.service';

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  
  players:Player[];
  controls:Componente[];
  colors = ['red', 'green', 'blue', 'yellow', 'black', 'white'];
  currentPlayer:number = 0;
  currentRound:number = 0;
  activeControl: Componente;
  pawns: any[];
  components: any[];
  decks: any[];
  playerOrder: boolean = true;
  result: any;
  showResult: boolean;
  resultEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private threeJsService: ThreeService, private gamedata:GameDataService, private runner:ScriptRunnerService) {}

  async initializeScene(container): Promise<void> {
    this.components = await this.initComponents();
    this.threeJsService.initializeScene(container);
    this.loadInitialObjects();
    this.initPlayers();
    this.initControls();
    this.initDecks();
    }

  async initPlayers(): Promise<void> {
  this.players = [];
  this.pawns = this.components.filter(comp => comp.three?.type === 'pawn');
  const count = parseInt(this.gamedata.game.jogadores.split(" - ")[0]) || 1;
  const colors = this.colors;

    for (let index = 0; index < count; index++) {
          this.addPlayer(index);
    }
  }
  
  addPlayer(index:number) {
    if(index <= this.pawns.length){
      const color = this.pawns[index]?.color || this.colors[index];
      const comp = this.pawns[index];
      this.players.push({index: index, color: color, name:comp.name});
      this.threeJsService.loadModelFromFile(comp.three.file, comp.color);
     }
  }
  
  async loadInitialObjects(): Promise<void> {
      const threedObjects = this.components.filter(comp => comp.three);
      if(threedObjects.length > 0){
        threedObjects.forEach((comp:any) =>{
              switch(comp.three.type){
                case 'board':
                  this.threeJsService.loadBoard(comp.imagem, comp.size.split('x')[0], comp.size.split('x')[1]);
                  break;
                case 'model':
                  this.threeJsService.loadModelFromUrl(comp.three.url);
                  break;
                case 'code':
                  this.threeJsService.loadModelFromString(comp.three.code);
                  break;
                case 'file':
                  this.threeJsService.loadModelFromFile(comp.three.file, comp.color);
                  break;
                case 'basic':
                  this.threeJsService.addObject(comp.three.geometry, comp.color);
                  break;
              }
          })
        }
      }

      initControls(): void {
          this.controls = this.components.filter(comp => comp.actions);
        }
    
      initDecks(): void {
          this.decks = this.components.filter(comp => comp.type === 'deck');
          this.decks.forEach( deck => {
            deck.cards = this.components.filter(comp => comp.group === deck.name);
            deck.ammount = deck.cards.length;
            deck.cards.map(card => card.background = deck.background);
          } )
        }

      async initComponents(): Promise<Componente[]> {
        const components$ = this.gamedata.getComponents();
        const components = await firstValueFrom(components$);
        return components;
      }
        
    getControl(control: Componente) {
      this.activeControl = control;
      this.result = null;
      this.showResult = false;
    }

    async runCode(action: GameAction, mockParameters?: any[]) {
      
      switch (action.id) {
        case 'roll':
          this.result = await this.runner.runScript(action.code);
          this.resultEmitter.emit(this.result);
          this.showResult = true;
          break;
          case 'shuffle':
          this.result = await this.runner.runScript(action.code);
          this.activeControl['cards'] = this.result.map(index => this.activeControl['cards'][index]);
          this.resultEmitter.emit(this.result);
          break;
          case 'pick':
          this.result = await this.runner.runScript(action.code);
          this.resultEmitter.emit(this.activeControl['cards'][0]);
          break;
          case 'distribute':
            this.result = await this.runner.runScript(action.code, [this.players.length]);
            this.players.forEach((player, i) => {
            player.cards = this.result[i].map(index => this.activeControl['cards'][index]);
          });
          
          break;
        default:
          this.showResult = false;
          break;
      }
    }

    getRulesContent(chapter:string){
      return this.gamedata.game[chapter];
    }

    nextRound() {
      this.currentRound += 1;
      this.currentPlayer = this.playerOrder ? 0 : this.players.length - 1;
    }
    
    nextPlayer() {
      if (this.playerOrder) {
        if (this.currentPlayer < this.players.length - 1) {
          this.currentPlayer += 1;
        } else {
          this.nextRound();
        }
      } else {
        if (this.currentPlayer > 0) {
          this.currentPlayer -= 1;
        } else {
          this.nextRound();
        }
      }
    }
    

}