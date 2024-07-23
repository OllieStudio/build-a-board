import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare const M;

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeComponent),
      multi: true
    }
  ]
})

export class RangeComponent implements OnInit, ControlValueAccessor {
  @Input() steps:number = 1;
  @Input() tick:number = 5;
  @Input() maxDe:number = 100;
  @Input() maxAte:number = 100;
  @Input() minDe:number = 1;
  @Input() minAte:number = 1;
  public deValue: number = 1;
  public ateValue: number = 1;

  @Input() _rangeValue: string;


  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() { }


  get counterValue() {
    return this._rangeValue;
  }

  set counterValue(val) {
    this._rangeValue = val;
   this.onChange(val);
    this.onTouch(val);
  }

  writeValue(value: any){
    this._rangeValue = value;
    console.log(this._rangeValue);
    this.deValue = value.split(" - ")[0] 
    this.ateValue = value.split(" - ")[1] 
  }

  registerOnChange(fn: any){
    this.onChange = fn
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }

  setValue(){
      this._rangeValue = this.deValue + " - " + this.ateValue;
      this.onChange(this._rangeValue);
      this.onTouch(this._rangeValue);
  }

  ngOnInit() {
    var array_of_dom_elements = document.querySelectorAll("input[type=range]");
    M.Range.init(array_of_dom_elements);
  }

  updateDe(event) {
    console.log(event.target.value);
    this.deValue = event.target.value;
    this.setValue();
  }
  
  updateAte(event) {
    console.log(event.target.value);
    this.ateValue = event.target.value;
    this.setValue();
  }
}
