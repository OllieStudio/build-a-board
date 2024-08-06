import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { AiButtonComponent } from 'src/app/creator/shared/ai-button/ai-button.component';
import { FileuploadModule } from 'src/app/creator/shared/fileupload/fileupload.module';
import { FontSelectorComponent } from 'src/app/creator/shared/font-selector/font-selector.component';
import { Texto } from 'src/app/services/interfaces/componente';

  // Change this to your Google API key


@Component({
  selector: 'app-text',
  standalone:true,
  imports:[CommonModule, FileuploadModule, AiButtonComponent, FontSelectorComponent],
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

  constructor(private gameservice:GameDataService){
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
    this.currentContent = ""
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
