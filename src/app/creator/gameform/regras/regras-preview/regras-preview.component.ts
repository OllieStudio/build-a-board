import { Component, Input } from '@angular/core';
import { GameDataService } from '../../../services/gamedata.service';

@Component({
  selector: 'app-regras-preview',
  templateUrl: './regras-preview.component.html',
  styleUrls: ['./regras-preview.component.css']
})
export class RegrasPreviewComponent {
@Input() hideButtons:boolean;

constructor(public gamedataservice:GameDataService){

}

  registerForm(){
    this.gamedataservice.registerForm('creator/design');
  }


}
