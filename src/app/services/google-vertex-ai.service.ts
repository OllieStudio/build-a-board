import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GameDataService } from '../creator/services/gamedata.service';

export enum AspectRatio {
  Square = "1:1",
  Ads = "3:4",
  TV = "4:3",
  Landscape = "16:9",
  Portrait = "9:16",
}

export enum ArtStyle {
  Photograph = "photograph",
  DigitalArt = "digital_art",
  Landscape = "landscape",
  Sketch = "sketch",
  Watercolor = "watercolor",
  Cyberpunk = "cyberpunk",
  PopArt = "pop_art",
  Ilustração = "Ilustração",
  Vetor = "Vetor"
}



@Injectable({
  providedIn: 'root'
})
export class VertexAIService {

  private apiUrl = 'https://us-central1-buildaboard2018.cloudfunctions.net/generateImage';

  constructor(private http: HttpClient, private gameservice: GameDataService) { }

  async generateImage(prompt: string, ratio:string = AspectRatio.Square, style:string = ArtStyle.DigitalArt): Promise<any> {
    prompt = `a ${prompt} for a ${this.gameservice.game.tipo} game named ${this.gameservice.game.titulo}.`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 
      prompt: prompt,
      ratio: ratio,
      style: style 
   };

    const result:any = await firstValueFrom(this.http.post<any>(this.apiUrl, body, { headers: headers }));
    return `data:image/png;base64, ${result.predictions[0].bytesBase64Encoded}`;
  }
}
