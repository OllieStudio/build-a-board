import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiButtonComponent } from '../ai-button/ai-button.component';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [CommonModule, AiButtonComponent],
  templateUrl: './prompt-input.component.html',
  styleUrls: ['./prompt-input.component.css']
})
export class PromptInputComponent {
@Output() output:EventEmitter<string> = new EventEmitter();
@Input() base:string;
@Input() label:string;
@Input() path:string;
@Input() hideSpinner:boolean;

generate(prompt:string){
  this.output.emit(`${this.base || ''} ${prompt}`);
  this.hideSpinner = false;
}

}
