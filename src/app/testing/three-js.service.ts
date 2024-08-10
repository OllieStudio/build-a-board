// src/app/services/three.service.ts
import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private dragControls: DragControls;
  private transformControls: TransformControls;
  private ambientLight: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;
  private draggableObjects: THREE.Object3D[] = [];

  constructor(private ngZone: NgZone) {
    
  }

  public initializeScene(container:HTMLElement) {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xDDDDDD);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    this.directionalLight.position.set(5, 10, 7.5).normalize();
    this.scene.add(this.directionalLight);

    // Camera position
    this.camera.position.set(0, 15, 25);
    this.camera.lookAt(0, 0, 0);

    container.appendChild(this.renderer.domElement);

    // Animation loop
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public getRendererDomElement(): HTMLElement {
    return this.renderer.domElement;
  }

  public loadModelFromString(modelData: string) {
    const loader = new GLTFLoader();
    loader.parse(modelData, '', (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0.5, 0);
      this.scene.add(model);
      this.enableInteractions(model);
    });
  }

  public loadModelFromFile(modelFile: string, color:any) {
    const objLoader = new OBJLoader();
    objLoader.load(modelFile, (object) => {
      object.position.set(10, 0.2, Math.floor(Math.random() * 10) + 1);
      
      // Create a new material (e.g., red color)
    const newMaterial = new THREE.MeshStandardMaterial({ color: color });

    // Traverse the model's scene graph to find all meshes and apply the new material
      object.traverse(function (node) {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          mesh.material = newMaterial;
      }
    });

      this.scene.add(object);
      this.enableInteractions(object);
    });
  }

 

  public loadModelFromUrl(modelUrl: string) {
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0.5, 0);
      this.scene.add(model);
      this.enableInteractions(model);
    });
  }

  public addObject(geometry: THREE.BufferGeometry, color: string) {
    const material = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    this.enableInteractions(mesh);
  }

  

  private enableInteractions(object: THREE.Object3D, constrain?:boolean) {
    // Add the object to the draggable objects array
    this.draggableObjects.push(object);

    // Reinitialize DragControls with the updated set of draggable objects
    if (this.dragControls) {
        this.dragControls.dispose();
    }
    this.dragControls = new DragControls(this.draggableObjects, this.camera, this.renderer.domElement);
    this.dragControls.addEventListener('dragstart', () => {
        this.controls.enabled = false;
    });
    this.dragControls.addEventListener('dragend', () => {
        this.controls.enabled = true;
    });

    // Constrain movement to X and Z axes only
    this.dragControls.addEventListener('drag', (event) => {
        // Prevent movement on the Y axis
        if(constrain) object.position.y = 0;
        if(constrain) object.rotation.x = -Math.PI/2;

    });

    // Initialize or update TransformControls
    if (!this.transformControls) {
        this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
        this.scene.add(this.transformControls);
    }
    this.transformControls.detach(); // Detach current object if any
    this.transformControls.attach(object);

    // Set mode to 'translate' to enable translation controls
    this.transformControls.setMode('translate');

    // Constrain translation to X and Z axes
    this.transformControls.setTranslationSnap(0.1);
    this.transformControls.addEventListener('objectChange', () => {
        // Prevent movement on the Y axis during translation
        if(constrain) object.position.y = 0;
        if(constrain) object.rotation.x = -Math.PI/2;
    });
}



  public async loadBoard(textureUrl: string, boardWidth: number, boardHeight: number) {
    const maxWidth = 1024;
  
    const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  
    const fetchImageAsBase64 = async (url: string): Promise<string> => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
      return blobToBase64(await response.blob());
    };
  
    const createTextureFromBase64 = async (base64: string): Promise<THREE.Texture> => {
      const image = new Image();
      image.src = base64;
      await new Promise<void>(resolve => image.onload = () => resolve());
  
      if (image.width > maxWidth) {
        const canvas = document.createElement('canvas');
        const scale = maxWidth / image.width;
        canvas.width = maxWidth;
        canvas.height = image.height * scale;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        image.src = canvas.toDataURL();
        await new Promise<void>(resolve => image.onload = () => resolve());
      }
  
      const texture = new THREE.Texture(image);
      texture.needsUpdate = true;
      return texture;
    };
  
    try {
      const base64Texture = await fetchImageAsBase64(textureUrl);
      const texture = await createTextureFromBase64(base64Texture);
  
      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(boardWidth, boardHeight),
        new THREE.MeshBasicMaterial({ map: texture })
      );
      board.rotation.x = -Math.PI / 2;
      board.position.y = 0.01;

      this.scene.add(board);
      this.enableInteractions(board, true);
    } catch (error) {
      console.error('Error loading texture:', error);
    }
  }
  
}
