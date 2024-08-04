import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeService } from '../three-js.service';
import * as THREE from 'three';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { Componente } from 'src/app/services/interfaces/componente';
import { TestingService } from '../testing.service';

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  @ViewChild('container', { static: true }) container: ElementRef<HTMLDivElement>;

  constructor(private testing:TestingService) {}

  ngOnInit(): void {
    this.testing.initializeScene(this.container.nativeElement);
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
