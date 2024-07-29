import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Upload } from 'src/app/services/interfaces/upload';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-uploads',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent {
  uploads: Upload[];

  constructor(private _uploadService: UploadService){
   // this._uploadService.getUploads();
    //this.uploads = this._uploadService.uploads;
  }

  removeUpload(upload: Upload){
    //this._uploadService.removeUpload(upload);
  }
}
