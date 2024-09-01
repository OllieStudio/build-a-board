import { Injectable } from '@angular/core';
import { ThreeService } from './three-js.service';
import { GameDataService } from '../creator/services/gamedata.service';
import { Player } from './testing.component';
import { Componente } from '../services/interfaces/componente';
import { findIndex, firstValueFrom } from 'rxjs';

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

  constructor(private threeJsService: ThreeService, private gamedata:GameDataService) {}

  async initializeScene(container): Promise<void> {
    this.components = await this.initComponents();
    this.threeJsService.initializeScene(container);
    this.loadInitialObjects();
    this.initPlayers();
    this.initControls();
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

        async initComponents(): Promise<Componente[]> {
          const components$ = this.gamedata.getComponents();
          const components = await firstValueFrom(components$);
          return components;
        }
}
