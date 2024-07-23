import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent {
  @Input() items:any[];
  @Input() closed:boolean = true;
  @Output() routeEmitter: EventEmitter<string> = new EventEmitter();

  constructor(){

  }

  getRoute(route:string) {
    this.closed = false;
    this.routeEmitter.next(route);
}
}
