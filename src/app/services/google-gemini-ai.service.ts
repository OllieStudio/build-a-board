import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from 'src/environments/environment';
import { GameDataService } from '../creator/services/gamedata.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleGeminiAIService {
  private genAI: GoogleGenerativeAI;
  private generationConfig: any;
  private model: any;

  constructor(private gameservice:GameDataService) {
    this.genAI = new GoogleGenerativeAI(environment.GEMINI_API_KEY);
    this.generationConfig = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
      temperature: 0.9,
      top_p: 1,
      top_k: 32,
      maxOutputTokens: 10000,
    };

    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-pro',
      ...this.generationConfig,
    });
  }

  async textToImage(prompt: string): Promise<any> {
    prompt = `you are working on a ${this.gameservice.game.tipo} game design, the game is named 
    '${this.gameservice.game.titulo} - ${this.gameservice.game.subtitulo}',
     please generate image for ${prompt}, you can be creative.`;

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
    prompt = 'you are working on a virtual board game, create javascript code for a virtual: ' + prompt;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response;
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  }

  async textToSVG(prompt: string): Promise<any> {
    prompt = 'you are working on a board game design, create code for a SVG file of: ' + prompt;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response;
    } catch (error) {
      console.error('Error generating SVG:', error);
      throw error;
    }
  }

  async textTo3D(prompt: string): Promise<any> {
    prompt = 'you are working on a virtual board game design, create a three.js 3D model of: ' + prompt;
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response;
    } catch (error) {
      console.error('Error generating 3D model:', error);
      throw error;
    }
  }

  async improveText(prompt: string, type:string): Promise<any> {
    prompt = `you are working on a ${this.gameservice.game.tipo} game named 
    '${this.gameservice.game.titulo} - ${this.gameservice.game.subtitulo}' , 
    please improve and correct this ${type} text keeping the original language: ${prompt}
    you can be creative.` ;
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();
      return response;
    } catch (error) {
      console.error('Error generating 3D model:', error);
      throw error;
    }
  }
}
