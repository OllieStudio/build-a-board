import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt-input.component.html',
  styleUrls: ['./prompt-input.component.css']
})
export class PromptInputComponent {
@Input() prompt:string;
@Input() path:string;

}
