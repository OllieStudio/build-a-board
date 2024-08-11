import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlItemComponent } from './control-item/control-item.component';
import { TestingService } from '../testing.service';
import { Componente } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [CommonModule, ControlItemComponent],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit{

  constructor(public testing: TestingService){
    
  }

  ngOnInit(): void {
    this.testing.initControls();
   }

   controlSelected(control:Componente){
    this.testing.activeControl = control;
   }
}
