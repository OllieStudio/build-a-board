import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiButtonComponent } from '../ai-button/ai-button.component';
import { ArtStyle } from 'src/app/services/google-vertex-ai.service';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [CommonModule, AiButtonComponent],
  templateUrl: './prompt-input.component.html',
  styleUrls: ['./prompt-input.component.css']
})

export class PromptInputComponent {
@Output() output:EventEmitter<string> = new EventEmitter();
@Output() styleChange:EventEmitter<string> = new EventEmitter();
@Input() base:string;
@Input() label:string;
@Input() path:string;
@Input() hideSpinner:boolean;
selectedStyle:string;
styles: any;

constructor(){
  this.styles = this.enumToArray(ArtStyle);
}


enumToArray(enumObj: any): string[] {
  return Object.keys(enumObj).filter(key => isNaN(Number(key)));
}

generate(prompt:string){
  this.output.emit(`${this.base || ''} ${prompt}`);
  this.hideSpinner = false;
}

onStyleChange(style:string){
  this.styleChange.emit(this.selectedStyle);
}

}
