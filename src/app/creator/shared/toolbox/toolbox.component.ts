import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreatorUIService } from '../../services/creator.service';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent {
  @Input() items:any[];
  @Output() routeEmitter: EventEmitter<string> = new EventEmitter();

  constructor(public creator:CreatorUIService, public drawer:DrawerService){

  }

  getRoute(route:string) {
    this.drawer.openToolBox();
    this.routeEmitter.next(route);
}
}
