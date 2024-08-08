import { Injectable } from '@angular/core';
import { DatabaseService } from '@ollieestudio/fire-lib';
import { Upload } from './interfaces/upload';
import { GameDataService } from '../creator/services/gamedata.service';
import { Componente, Modifier } from './interfaces/componente';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploads: any[];
  

  constructor(private gameservice:GameDataService, private database:DatabaseService<Upload>) { }

  addUpload(event: any, componente?:Componente, modifier?:Modifier) {
    const upload: Upload = {
      tipo: componente?.classname || 'upload',
      url: event,
      timestamp: new Date().getTime(),
      name: (componente?.classname || 'upload')  + "_" + (modifier?.type || 'default') + "_" + new Date().getTime(),
      alt: "",
      description: "",
      component: componente?.id
    };

    this.database.add(upload, 'GAMES/'+this.gameservice.game.id+'/UPLOADS').then(list =>{
      
    })
  }

  removeUpload(upload: Upload) {
    upload.id = upload['idField'];
    this.database.delete(upload, 'GAMES/'+this.gameservice.game.id+'/UPLOADS').then(list =>{
    })
  }

  getUploads() {
   return  this.database.listValues('GAMES/'+this.gameservice.game.id+'/UPLOADS');
  }
}
