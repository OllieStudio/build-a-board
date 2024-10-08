import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';
import { GameDataService } from '../creator/services/gamedata.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GoogleGeminiAIService {
  private genAI: GoogleGenerativeAI;
  private generationConfig: any;
  private model: any;

  constructor(private gameservice:GameDataService, private sanitizer: DomSanitizer) {
    this.genAI = new GoogleGenerativeAI(environment.GEMINI_API_KEY);
    this.generationConfig = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
      temperature: 0.5,
      top_p: 1,
      top_k: 32,
      maxOutputTokens: 1000000,
      candidateCount: 1
    };

    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-pro',
      ...this.generationConfig,
    });
  }

  async textToImage(prompt: string): Promise<any> {
    prompt = `you are working on a ${this.gameservice.game.tipo} game design, the game is named 
    '${this.gameservice.game.titulo} - ${this.gameservice.game.subtitulo}',
     please generate  Base64 image code for ${prompt}, you can be creative.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();
      return response;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }

  async textToCode(prompt: string): Promise<any> {
    prompt = 'you are working on a virtual board game, create a plain traditional javascript code for ' + prompt + ' any parameter must have a default value';

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();
      return response;
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  }

  async textToSVG(prompt: string, type:string): Promise<any> {
    prompt = `you are working on a ${this.gameservice.game.tipo} game design, the game is named 
    '${this.gameservice.game.titulo} - ${this.gameservice.game.subtitulo}',
     please generate a very creative and high quality clipart style SVG code for a ${type}, following this prompt: ${prompt},
     you can use colors, shapes, patterns, textures creatively.`

    try {
      const result = await this.model.generateContent(prompt);
      const svgContent = await result.response.text();
      const match = svgContent.match(/<svg[\s\S]*?<\/svg>/);
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(match[0])}`;
      return this.sanitizer.bypassSecurityTrustHtml('data:image/svg+xml;charset=utf-8,' + match[0]);

    } catch (error) {
      console.error('Error generating SVG:', error);
      throw error;
    }
  }

  async textTo3D(prompt: string): Promise<any> {
    prompt = `generate GLTF three.js code for a 3D model of ${prompt}` ;
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();
      return response.replace().replace('```GLTF', '').replace('```');
    } catch (error) {
      console.error('Error generating 3D model:', error);
      throw error;
    }
  }

  async improveText(prompt: string, type:string): Promise<any> {
    if(this.gameservice.game){
      prompt = `you are working on a ${this.gameservice.game?.tipo || 'a'} game named 
      '${this.gameservice.game?.titulo} - ${this.gameservice.game?.subtitulo}' , 
      please ${type} keeping the original language: ${prompt}`
    }else{
      prompt = `you are working on a board game please ${type} keeping the original language: ${prompt}`
    } ;
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();
      return response;
    } catch (error) {
      console.error('Error generating Text:', error);
      throw error;
    }
  }
  
  async translateText(prompt: string, type:string): Promise<any> {
    
      prompt = ` ${type} : ${prompt}`
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();
      return response;
    } catch (error) {
      console.error('Error generating Text:', error);
      throw error;
    }
  }
}
