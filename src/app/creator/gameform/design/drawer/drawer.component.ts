import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/creator/services/component.service';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { DragDropService } from 'src/app/creator/services/drag.service';
import { DrawerService } from 'src/app/creator/services/drawer.service';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { Componente } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  components: Componente[];

 constructor(private gameservice:GameDataService, public dragservice:DragDropService, public component:ComponentService, public drawer:DrawerService, public creator:CreatorUIService){
    this.gameservice.getComponents().subscribe(res => this.components = res)
 }

 removeComponent(component:Componente){
  this.gameservice.removeComponent(component)
 }
}
