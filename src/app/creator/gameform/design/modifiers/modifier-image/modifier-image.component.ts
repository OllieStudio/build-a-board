import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-modifier-image',
  standalone: true,
  imports: [CommonModule, FileuploadModule, PromptInputComponent, FormsModule],
  templateUrl: './modifier-image.component.html',
  styleUrls: ['./modifier-image.component.css']
})
export class ModifierImageComponent {
  @Input() modifier:Modifier = {} as Modifier;
  hideSpinner = true;
  styles: string[];
  selectedStyle:string;

  constructor(private vertex:VertexAIService, private aiservice:GoogleGeminiAIService, private gamedataservice:GameDataService, private creator: CreatorUIService,
     private uploads:UploadService){
      this.styles = this.enumToArray(ArtStyle);
  }
  
  path:string = `game/${this.gamedataservice.game.titulo}/components/${this.modifier?.component}/${this.modifier?.property}_`;
  activeTab: string = 'upload';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onValueChange(event: any) {
    this.creator.updateItemModifier(this.modifier, event);
    this.addToUploads(event);
  }

  private addToUploads(event: any) {
    this.uploads.addUpload(event, this.creator.currentComponent, this.modifier);
  }

  async generateImage(prompt){
    this.hideSpinner = false;
    const bg = await this.vertex.generateImage(`${prompt}, ${this.modifier.imageprompt}`, this.modifier.ratio || AspectRatio.Square, this.selectedStyle);
    this.creator.updateItemModifier(this.modifier, bg);
    this.hideSpinner = true;
  }
  
  async generateSVG(prompt){
    this.hideSpinner = false;
    const bg = await this.aiservice.textToSVG(prompt, this.modifier.svgprompt);
    this.creator.updateItemModifier(this.modifier, bg);
    this.hideSpinner = true;
  }

   enumToArray(enumObj: any): string[] {
    return Object.keys(enumObj).filter(key => isNaN(Number(key)));
  }
}
