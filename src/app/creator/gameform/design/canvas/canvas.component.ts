import { Component } from '@angular/core';
import { CreatorUIService } from 'src/app/creator/services/creator.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {
  constructor(public creator:CreatorUIService){
    this.creator.closeToolBox();
    this.creator.closeDrawer();
  }

}
