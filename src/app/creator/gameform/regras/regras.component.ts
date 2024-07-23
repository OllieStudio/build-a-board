import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../services/gamedata.service';

declare const MStepper;

@Component({
  selector: 'app-regras',
  templateUrl: './regras.component.html',
  styleUrls: ['./regras.component.css']
})
export class RegrasComponent implements OnInit {
 

  constructor(gamedataservice:GameDataService) {
   }

  ngOnInit() {
    
  }

}
