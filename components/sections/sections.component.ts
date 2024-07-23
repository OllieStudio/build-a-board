import { Component, Input } from '@angular/core';
import { Website } from './interfaces/website';
import { Section } from './interfaces/section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {
  @Input() website:Website;
  @Input() sections:Section[];
  @Input() captchaResolved: boolean;

  constructor() { }
  
 
}
