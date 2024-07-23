import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})

export class RatingComponent implements  ControlValueAccessor {
@Input()label:string;
@Input()idd:string;
@Input() _ratingValue: number;


  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() { }



  writeValue(value:any){
    this._ratingValue = parseInt(value);
  }

  registerOnChange(fn: any){
    this.onChange = fn
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }

  setValue(event){
    this._ratingValue = parseInt(event.target.value);
    this.onChange( this._ratingValue);
    this.onTouch( this._ratingValue);
  }

  isChecked(value: number):boolean {
    return this._ratingValue === value;
  }
  
}
