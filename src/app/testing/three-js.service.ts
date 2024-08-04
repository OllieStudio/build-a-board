// three-js.service.ts
import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class ThreeJsService {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer;
  private animate: () => void;

  constructor(private ngZone: NgZone) {}

  init(container: HTMLElement): void {
    if(!this.scene){
      this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xCCCCCC);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    
    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch (e) {
      this.renderer = new THREE.WebGL1Renderer({ antialias: true });
    }
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);
    
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(this.scene.position);
    
    this.animate = () => {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    };
    
    this.ngZone.runOutsideAngular(() => this.animate());
  }
}
  
  addObject(object: THREE.Object3D): void {
    this.scene.add(object);
  }

  updateCameraAngle(angle: number): void {
    const radius = 5; // distance from the center
    const radianAngle = THREE.MathUtils.degToRad(angle);

    // Calculate new camera position
    const x = radius * Math.sin(radianAngle);
    const z = radius * Math.cos(radianAngle);

    this.camera.position.set(x, this.camera.position.y, z);
    this.camera.lookAt(this.scene.position);
  }
}
