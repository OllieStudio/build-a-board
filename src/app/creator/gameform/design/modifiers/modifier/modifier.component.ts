import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { Modifier } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent {
  @Input() modifier:Modifier;
  show: boolean = false;
  
  constructor(public creator:CreatorUIService){
  }

  toggle(){
    this.show = !this.show;
  }
}
