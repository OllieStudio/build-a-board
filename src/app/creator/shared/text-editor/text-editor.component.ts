import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Texto } from 'src/app/services/interfaces/componente';
import { AiButtonComponent } from '../ai-button/ai-button.component';
import { FormsModule } from '@angular/forms';
import { FontSelectorComponent } from '../font-selector/font-selector.component';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [CommonModule, AiButtonComponent, FontSelectorComponent, FormsModule],
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit{
 
  @Input() textData:Texto;
  @Output() textChange:EventEmitter<Texto> =  new EventEmitter();
  selectedFont: string = 'Roboto';
  selectedSize: number = 16;
  selectedStyle: string = 'normal';
  selectedColor: string = '#CCC';
  currentContent:string = "";


  ngOnInit(): void {
    this.currentContent = this.textData?.content;
    this.selectedColor = this.textData?.selectedColor;
    this.selectedFont = this.textData?.selectedFont;
    this.selectedSize = this.textData?.selectedSize;
    this.selectedStyle = this.textData?.selectedStyle;
    
  }

  registerText(textinput:string){
    let text:Texto = {} as Texto;
    text.selectedColor = this.selectedColor;
    text.selectedFont = this.selectedFont;
    text.selectedSize = this.selectedSize;
    text.selectedStyle = this.selectedStyle;
    text.content = textinput;
    this.textChange.emit(text);
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
