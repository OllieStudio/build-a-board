import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modifier } from 'src/app/services/interfaces/componente';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { FileuploadModule } from 'src/app/creator/shared/fileupload/fileupload.module';
import { PromptInputComponent } from 'src/app/creator/shared/prompt-input/prompt-input.component';

@Component({
  selector: 'app-modifier-image',
  standalone: true,
  imports: [CommonModule, FileuploadModule, PromptInputComponent],
  templateUrl: './modifier-image.component.html',
  styleUrls: ['./modifier-image.component.css']
})
export class ModifierImageComponent {
  @Input() modifier:Modifier = {} as Modifier;

  constructor(private gamedataservice:GameDataService){

  }
  
  path:string = `game/${this.gamedataservice.game.titulo}/components/${this.modifier?.component}/${this.modifier?.property}_${new Date().getTime() }.png`;
  activeTab: string = 'upload';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
