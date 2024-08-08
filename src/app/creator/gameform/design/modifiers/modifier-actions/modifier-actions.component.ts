import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameAction, Modifier } from 'src/app/services/interfaces/componente';
import { FileuploadModule } from 'src/app/creator/shared/fileupload/fileupload.module';
import { PromptInputComponent } from 'src/app/creator/shared/prompt-input/prompt-input.component';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-actions',
  standalone: true,
  imports: [CommonModule, FileuploadModule, PromptInputComponent, FormsModule],
  templateUrl: './modifier-actions.component.html',
  styleUrls: ['./modifier-actions.component.css']
})
export class ModifierActionsComponent {
  @Input() modifier:Modifier = {} as Modifier;
  hideSpinner = true;
  actions: GameAction[];
  selectedStyle:string;

  constructor(private aiservice:GoogleGeminiAIService, private creator: CreatorUIService){
    // this.actions = this.modifier.actions;
  }

  async generateCode(prompt, action:GameAction){
    this.hideSpinner = false;
    const code = await this.aiservice.textToCode(' for a function named ' + action.id + ' that performs ' + prompt);
    this.modifier.actions.find(a => a.id == action.id).code = code;
    this.modifier.actions.find(a => a.id == action.id).prompt = prompt;
    this.creator.updateItemModifier(this.modifier, this.modifier.actions);
    this.hideSpinner = true;
  }
}
