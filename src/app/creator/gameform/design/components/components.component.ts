import {Component} from '@angular/core';
import { CreatorUIService } from 'src/app/creator/services/creator.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent {
  searchTerm:any;
  
  constructor(public creator:CreatorUIService){

  }
  
  
}
