import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { AiButtonComponent } from 'src/app/creator/shared/ai-button/ai-button.component';
import { FileuploadModule } from 'src/app/creator/shared/fileupload/fileupload.module';
import { FontSelectorComponent } from 'src/app/creator/shared/font-selector/font-selector.component';
import { Texto } from 'src/app/services/interfaces/componente';


@Component({
  selector: 'app-text',
  standalone:true,
  imports:[CommonModule, FormsModule, FileuploadModule, AiButtonComponent, FontSelectorComponent],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  items:string[];
  path:string;
  activeTab:string;
  selectedFont: string = 'Roboto';
  selectedSize: number = 16;
  selectedStyle: string = 'normal';
  selectedColor: string = '#CCC';
  currentContent:string = "";

  constructor(private gameservice:GameDataService, public creator:CreatorUIService){
     this.gameservice.getTexts().subscribe(res => this.items = res)
  }

  registerText(textinput:string){
    let text:Texto = {} as Texto;
    text.selectedColor = this.selectedColor;
    text.selectedFont = this.selectedFont;
    text.selectedSize = this.selectedSize;
    text.selectedStyle = this.selectedStyle;
    text.content = textinput;
    this.gameservice.saveText(text);
    this.currentContent = "";
    this.activeTab = "";
  }

  onFileUploaded(fileinput:string[]){

  }

  generateText(textinput:string){

  }

  onFontChange(font: string) {
    this.selectedFont = font;
  }

  onFontSizeChange(size: number) {
    this.selectedSize = size;
  }

  onFontStyleChange(style: string) {
    this.selectedStyle = style;
  }
 
  onColorChange(color: string) {
    this.selectedColor = color;
  }

}
