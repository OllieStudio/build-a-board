import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreatorUIService } from '../../services/creator.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent {
  @Input() items:any[];
  @Output() routeEmitter: EventEmitter<string> = new EventEmitter();

  constructor(public creator:CreatorUIService){

  }

  getRoute(route:string) {
    this.creator.closeToolbox = false;
    this.routeEmitter.next(route);
}
}
