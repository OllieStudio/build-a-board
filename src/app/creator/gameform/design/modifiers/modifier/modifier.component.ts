import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorUIService } from 'src/app/creator/services/creator.service';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent {
  @Input() modifier:any;
  
  constructor(public creator:CreatorUIService){

  }
}
