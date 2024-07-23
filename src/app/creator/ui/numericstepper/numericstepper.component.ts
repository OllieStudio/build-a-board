import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-numericstepper',
  templateUrl: './numericstepper.component.html',
  styleUrls: ['./numericstepper.component.css']
})
export class NumericstepperComponent implements OnInit {

  @Input() item:any;
  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  public mouseOvered:boolean;
  public mouseOvered1:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  emitChange(){
    console.log('1');
    this.changed.next(true);
  }

}
