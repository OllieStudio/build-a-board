import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radioimage',
  templateUrl: './radioimage.component.html',
  styleUrls: ['./radioimage.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioimageComponent),
      multi: true
    }
  ]
})
export class RadioimageComponent implements ControlValueAccessor {
  @Input() label:string;
  @Input() image:string;
  @Input() group:string;
  @Input() legenda:string;
  @Input() _radioValue: string;


  onChange: any = () => {};
  onTouch: any = () => {};
  isChecked: boolean;

  constructor() { }


  get counterValue() {
    return this._radioValue;
  }

  set counterValue(val) {
    this._radioValue = val;
   this.onChange(val);
    this.onTouch(val);
  }

  writeValue(value: any){
    this._radioValue = value;
    if(value === this.label) {
      this.isChecked = true;
    }
  }

  registerOnChange(fn: any){
    this.onChange = fn
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }

  setValue(event){
    console.log(event);
    if(event.target.checked){
      this._radioValue = event.target.value;
      this.onChange(event.target.value);
      this.onTouch(event.target.value);
    }
  }
}
