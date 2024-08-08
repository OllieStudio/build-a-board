import { Component, Input } from '@angular/core';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { Componente } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
 @Input() closed:boolean = false;
  components: Componente[];

 constructor(private gameservice:GameDataService, public creator:CreatorUIService){
    this.gameservice.getComponents().subscribe(res => this.components = res)
 }

 removeComponent(component:Componente){
  this.gameservice.removeComponent(component)
 }
}
