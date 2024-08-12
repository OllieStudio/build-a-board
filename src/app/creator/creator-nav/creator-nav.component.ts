import { Component } from '@angular/core';
import { GameDataService } from '../services/gamedata.service';

@Component({
  selector: 'app-creator-nav',
  templateUrl: './creator-nav.component.html',
  styleUrls: ['./creator-nav.component.css']
})
export class CreatorNavComponent {
  constructor(public gameservice:GameDataService) { }


}
