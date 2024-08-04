import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeJsService } from '../three-js.service';
import * as THREE from 'three';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { Componente } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent {
  @ViewChild('container', { static: true }) container: ElementRef<HTMLDivElement>;

  constructor(private threeJsService: ThreeJsService, private gamedata:GameDataService) {}

  ngOnInit(): void {
    this.threeJsService.init(this.container.nativeElement);
    this.loadInitialObjects();
  }

  async loadInitialObjects(): Promise<void> {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.threeJsService.addObject(cube);

       this.gamedata.getComponents().subscribe(res =>
        this.loadComponents(res)
       )
  }

  loadComponents(components:Componente[]){
      components.filter(comp => comp.three).forEach(comp =>{
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.threeJsService.addObject(cube);
      })
  }

  onAngleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const angle = parseFloat(input.value);
    this.threeJsService.updateCameraAngle(angle);
  }
}
