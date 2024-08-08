import {  Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { CreatorUIService } from '../../services/creator.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  enableZoom: boolean;
  zoomSpeed: number;
  menuItems = [  { icon: 'extension', route: 'components', title: 'Componentes' },  { icon: 'cloud_upload', route: 'uploads', title: 'Uploads' },  { icon: 'interests', route: 'elements', title: 'Elementos' },  { icon: 'text_fields', route: 'text', title: 'Texto' },  /* { icon: 'palette', route: 'create', title: 'Criar' },  { icon: 'star', route: 'elements', title: 'Elementos' }, */];

  constructor(private router:Router, public creator:CreatorUIService) {}

  ngOnInit() {
  }

  getTool(route:any){
    if(this.router.url.includes(route)){
      this.creator.toggleToolbox();
    }
    this.router.navigateByUrl('creator/design/' + route);
  }
}
