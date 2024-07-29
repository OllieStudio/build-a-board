import { Component, Input } from '@angular/core';
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
@Input() prompt:string;
@Input() path:string;


generate(prompt:string){

}
}
