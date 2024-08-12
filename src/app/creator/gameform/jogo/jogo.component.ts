import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../services/gamedata.service';


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit  {

  constructor(private gamedataservice:GameDataService){

  }

  ngOnInit(): void {
    // this.gamedataservice.getGame('lAmehvWJfleriLkqzY6r'); 
  }
 
 

  



}
