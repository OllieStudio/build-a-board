import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-align-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './align-selector.component.html',
  styleUrls: ['./align-selector.component.css']
})
export class AlignSelectorComponent {
  @Input() verticalAlign: string = 'center';
  @Input() horizontalAlign: string = "center";

  @Output() verticalChange = new EventEmitter<string>();
  @Output() horizontalChange = new EventEmitter<string>();

  setVerticalAlign(value:string){
    this.verticalAlign = value
    this.verticalChange.emit(this.verticalAlign);
  }

  setHorizontalAlign(value:string){
    this.horizontalAlign = value;
    this.horizontalChange.emit(this.horizontalAlign);
  }
}
