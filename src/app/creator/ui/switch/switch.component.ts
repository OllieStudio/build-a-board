import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent implements ControlValueAccessor {
@Input() On:string;
@Input() Off:string;
@Input() label:string;
@Input() ctrlname:string;
@Input() _switchValue: string;
@Input() group: string[];
isChecked: boolean;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() { }


  get counterValue() {
    return this._switchValue;
  }

  set counterValue(val) {
    this._switchValue = val;
   this.onChange(val);
    this.onTouch(val);
  }

  writeValue(value: any){
    this._switchValue = value;
  }

  registerOnChange(fn: any){
    this.onChange = fn
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }

  setValue(event){
    if(event.target.checked){
      this._switchValue = event.target.value;
    }else{
      this._switchValue = null;
    }
      this.onChange( this._switchValue);
      this.onTouch( this._switchValue);
  }

}
