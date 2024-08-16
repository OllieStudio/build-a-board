import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { DragDropService } from 'src/app/creator/services/drag.service';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { AiButtonComponent } from 'src/app/creator/shared/ai-button/ai-button.component';
import { FileuploadModule } from 'src/app/creator/shared/fileupload/fileupload.module';
import { FontSelectorComponent } from 'src/app/creator/shared/font-selector/font-selector.component';
import { TextEditorComponent } from 'src/app/creator/shared/text-editor/text-editor.component';
import { Texto } from 'src/app/services/interfaces/componente';


@Component({
  selector: 'app-text',
  standalone:true,
  imports:[CommonModule, TextEditorComponent, DragDropModule, FormsModule, FileuploadModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  items:string[];
  path:string;
  activeTab:string = '';
  editText:Texto;

  constructor(private gameservice:GameDataService, public dragservice:DragDropService,  public creator:CreatorUIService){
     this.gameservice.getTexts().subscribe(res => this.items = res)
  }

  registerText(text:Texto){
    this.gameservice.saveText(text);
    this.activeTab = "";
  }

  onFileUploaded(fileinput:string[]){

  }

  removeText(texto: Texto){
    this.gameservice.removeText(texto);
  }

}
