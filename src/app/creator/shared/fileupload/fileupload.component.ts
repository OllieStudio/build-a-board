import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StorageService } from '@ollieestudio/fire-lib';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileuploadComponent),
      multi: true
    }
  ]
})

export class FileuploadComponent implements ControlValueAccessor, OnInit {
@Input() label:string;
@Input() accepts:string;
@Input() path: any;
@Input() multiple: boolean = false;
@Output() valueChange:EventEmitter<any> = new EventEmitter();

onChange: any = () => {};
onTouch: any = () => {};
public _value: any;
public _accepts: any;
public hideSpinner:boolean = true;

constructor(private storage:StorageService){

}
  ngOnInit(): void {
    switch (this.accepts) {
      case 'xls': this._accepts = ".csv,.xls,.xlsx, .txt";
      break;
      case 'img': this._accepts  = "image/x-png,image/gif,image/jpeg";
      break;
      case 'pdf': this._accepts  = "application/pdf";
      break;
      case 'doc': this._accepts  =".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      break;
    
      default: this._accepts  = "";
        break;
    }
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn:any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }


  fileChanged(event) {
    var files: File[] = Array.from(event.target.files);
    this.hideSpinner = false;
  
    files.forEach(file => {
      var myReader: FileReader = new FileReader();
  
      myReader.onloadend = async e => {
        if (!this.path) {
          this._value = myReader.result.toString();
          this.onChange(myReader.result.toString());
          this.hideSpinner = true;
        } else {
          switch (this.accepts) {
            case 'xls': 
              this._accepts = ".csv,.xls,.xlsx, .txt";
              break;
            case 'img':
              let fileImg: any = myReader.result.toString().split(',')[1];
              await this.uploadImg(fileImg, file.name);
              break;
            case 'pdf':
              let filePDF: any = myReader.result.toString().split(',')[1];
              await this.uploadPDF(filePDF, file.name);
              break;
            case 'doc':
              this._accepts = ".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
              break;
            default:
              this._accepts = "";
              break;
          }
        }
      };
  
      myReader.readAsDataURL(file);
    });
  }
  
  async uploadPDF(file: any, filename:string) {
    await this.storage.uploadPDF(file, this.path + filename ).then(result => {
      this._value = result;
      this.onChange(result);
      this.valueChange.emit(result);
      this.hideSpinner = true;
    })
  }

  private async uploadImg(file: any, filename:string) {
    await this.storage.uploadImage(file, this.path + filename).then(result => {
      this._value = result;
      this.onChange(result);
      this.valueChange.emit(result);
      this.hideSpinner = true;
    });
  }
}
