import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { FileuploadModule } from 'src/app/creator/shared/fileupload/fileupload.module';
import { PromptInputComponent } from 'src/app/creator/shared/prompt-input/prompt-input.component';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';
import { Elemento, Texto } from 'src/app/services/interfaces/componente';

@Component({
  selector: 'app-elements',
  standalone:true,
  imports:[CommonModule, DragDropModule, FormsModule, FileuploadModule, PromptInputComponent],
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent {
  activeTab: string;
  items:Elemento[] = [];
  path:string = `ELEMENTS/`;
  hideSpinner:boolean = true;

  constructor(private gameservice:GameDataService, public creator:CreatorUIService, private aiservice:GoogleGeminiAIService){
    this.gameservice.getElements().subscribe(res => this.items = [...res]);
    this.gameservice.getCommonElements().subscribe(res => this.items = [...res]);
  }

  registerText(text:Texto){
    this.gameservice.saveText(text);
    this.activeTab = "";
 }


 onFileUploaded(fileinput:string){
  let elem:Elemento = {} as Elemento;
      elem.template = fileinput;
      elem.id = new Date().getTime().toString();
      elem.name = elem.id;
    this.gameservice.saveElemento(elem);
 }

 async generateSVG(prompt){
  const bg = await this.aiservice.textToSVG(prompt, '');
  this.onFileUploaded(bg);
  this.hideSpinner = true;
}
}
