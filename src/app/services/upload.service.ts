import { Injectable } from '@angular/core';
import { DatabaseService } from '@ollieestudio/fire-lib';
import { Upload } from './interfaces/upload';
import { GameDataService } from '../creator/services/gamedata.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploads: any[];
  

  constructor(private gameservice:GameDataService, private database:DatabaseService<Upload>) { }

  addUpload(upload: Upload) {
    this.database.add(upload, 'GAMES/'+this.gameservice.game.id+'/UPLOADS').then(list =>{
      
    })
  }

  removeUpload(upload: Upload) {
    this.database.delete(upload, 'GAMES/'+this.gameservice.game.id+'/UPLOADS').then(list =>{
      
    })
  }

  getUploads() {
      this.database.listValues('GAMES/'+this.gameservice.game.id+'/UPLOADS').subscribe(res => {
        this.uploads = res;
    })
  }
}
