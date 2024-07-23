import { Component, Input } from '@angular/core';
import { HomeService } from '../home.service';
import { Website } from 'components/sections/interfaces/website';
import { Section } from 'components/sections/interfaces/section';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {
 @Input() section:Section;

  constructor(){
    
  }
}
