import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { FileuploadComponent } from 'src/app/creator/shared/fileupload/fileupload.component';
import { FileuploadModule } from 'src/app/creator/shared/fileupload/fileupload.module';
import { Upload } from 'src/app/services/interfaces/upload';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-uploads',
  standalone:true,
  imports:[CommonModule, FileuploadModule],
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent {
  uploads: Upload[];
  path:string = `game/${this.gamedataservice.game.titulo}/components/uploads/`;
  
  constructor(private _uploadService: UploadService, private gamedataservice:GameDataService){
    this._uploadService.getUploads().subscribe(res =>{
      this.uploads = res;
    });
  }

  removeUpload(upload: Upload){
    this._uploadService.removeUpload(upload);
  }

  onValueChange($event){
    this._uploadService.addUpload($event);
  }
}
