import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GameDataService } from '../creator/services/gamedata.service';

@Injectable({
  providedIn: 'root'
})
export class VertexAIService {

  private apiUrl = 'https://us-central1-buildaboard2018.cloudfunctions.net/generateImage';

  constructor(private http: HttpClient, private gameservice: GameDataService) { }

  async generateImage(prompt: string): Promise<any> {
    prompt = `you are working on a ${this.gameservice.game.tipo} game design, the game is named 
    '${this.gameservice.game.titulo} - ${this.gameservice.game.subtitulo}',
     please generate image for a ${prompt}, you can be creative.`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { prompt: prompt };

    const result:any = await firstValueFrom(this.http.post<any>(this.apiUrl, body, { headers: headers }));
    return `data:image/png;base64, ${result.predictions[0].bytesBase64Encoded}`;
  }
}
