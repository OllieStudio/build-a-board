import { Injectable } from '@angular/core';
import { ThreeService } from './three-js.service';
import { GameDataService } from '../creator/services/gamedata.service';
import { Player } from './testing.component';

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  players:Player[];
  colors = ['red', 'green', 'blue', 'yellow', 'black', 'white'];
  currentPlayer:number = 0;
  currentRound:number = 0;

  constructor(private threeJsService: ThreeService, private gamedata:GameDataService) {}

  initializeScene(container): void {
    this.threeJsService.initializeScene(container);
    this.loadInitialObjects();
  }

  initPlayers(): void {
  this.players = [];
  const count = parseInt(this.gamedata.game.jogadores.split(" - ")[0]) || 1;
  const colors = this.colors;

    for (let index = 0; index < count; index++) {
          this.addPlayer(index, colors[index])
    }
  }
  
  addPlayer(index:number, color: string) {
     this.players.push({index: index, color: color, name: `Player ${index}`})
  }

  async loadInitialObjects(): Promise<void> {
      this.gamedata.getComponents().subscribe(res =>{
        res.filter(comp => comp.three).forEach((comp:any) =>{
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
        })
      }

  onAngleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const angle = parseFloat(input.value);
   // this.threeJsService.updateCameraAngle(angle);

   /*  updateCameraAngle(angle: number): void {
      const radius = 5; // distance from the center
      const radianAngle = THREE.MathUtils.degToRad(angle);
  
      // Calculate new camera position
      const x = radius * Math.sin(radianAngle);
      const z = radius * Math.cos(radianAngle);
  
      this.camera.position.set(x, this.camera.position.y, z);
      this.camera.lookAt(this.scene.position);
    } */
  }
}
