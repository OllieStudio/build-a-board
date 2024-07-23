import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent {
  @Output() zoomValueChange:EventEmitter<number> = new EventEmitter<number>();
  @Input() value: number = 1

changeZoom(zoomValue: any) {
  this.zoomValueChange.emit(zoomValue)
}

}
