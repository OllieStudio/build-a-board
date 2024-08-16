import {Component} from '@angular/core';
import { ComponentService } from 'src/app/creator/services/component.service';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { DragDropService } from 'src/app/creator/services/drag.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent {
  searchTerm:any;
  
  constructor(public component:ComponentService, public dragservice:DragDropService, public creator:CreatorUIService){

  }
  
  
}
