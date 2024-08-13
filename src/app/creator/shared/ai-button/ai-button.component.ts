import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-button.component.html',
  styleUrls: ['./ai-button.component.css']
})
export class AiButtonComponent {
  @Input() hideSpinner:boolean = true;
  @Input() label:string;
}
