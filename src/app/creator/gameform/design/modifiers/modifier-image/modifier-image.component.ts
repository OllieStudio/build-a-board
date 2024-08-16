import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { FileuploadModule } from 'src/app/creator/shared/fileupload/fileupload.module';
import { PromptInputComponent } from 'src/app/creator/shared/prompt-input/prompt-input.component';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { UploadsComponent } from '../../uploads/uploads.component';
import { UploadService } from 'src/app/services/upload.service';
import { Upload } from 'src/app/services/interfaces/upload';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';
import { ArtStyle, AspectRatio, VertexAIService } from 'src/app/services/google-vertex-ai.service';
import { FormsModule } from '@angular/forms';
import { ModifiersService } from 'src/app/creator/services/modifiers.service';
import { ComponentService } from 'src/app/creator/services/component.service';

@Component({
  selector: 'app-modifier-image',
  standalone: true,
  imports: [CommonModule, FileuploadModule, PromptInputComponent, FormsModule],
  templateUrl: './modifier-image.component.html',
  styleUrls: ['./modifier-image.component.css']
})
export class ModifierImageComponent implements OnInit{
  @Input() modifier:Modifier = {} as Modifier;
  hideSpinner = true;
  styles: string[];
  selectedStyle:string;
  path: any;
  activeTab: any;

  constructor(private vertex:VertexAIService, private aiservice:GoogleGeminiAIService, private gamedataservice:GameDataService, private creator: CreatorUIService,
     private uploads:UploadService, private modifierservice:ModifiersService, private component:ComponentService){
      this.styles = this.enumToArray(ArtStyle);
  }
  
  ngOnInit(): void {
    this.path = `game/${this.gamedataservice.game?.id}/imgs/${this.modifier?.component}_${this.modifier?.property}_`;
    this.activeTab = 'upload';
  }
  

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onValueChange(event: any) {
    this.modifierservice.updateItemModifier(this.modifier, event);
    this.addToUploads(event);
  }

  private addToUploads(event: any) {
    this.uploads.addUpload(event, this.component.currentComponent, this.modifier);
  }

  async generateImage(prompt){
    this.hideSpinner = false;
    const bg = await this.vertex.generateImage(`${prompt}, ${this.modifier.imageprompt}`, this.modifier.ratio || AspectRatio.Square, this.selectedStyle);
    this.modifierservice.updateItemModifier(this.modifier, bg);
    this.hideSpinner = true;
  }
  
  async generateSVG(prompt){
    this.hideSpinner = false;
    const bg = await this.aiservice.textToSVG(prompt, this.modifier.svgprompt);
    this.modifierservice.updateItemModifier(this.modifier, bg);
    this.hideSpinner = true;
  }

   enumToArray(enumObj: any): string[] {
    return Object.keys(enumObj).filter(key => isNaN(Number(key)));
  }
}
