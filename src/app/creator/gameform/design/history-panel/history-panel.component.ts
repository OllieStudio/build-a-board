import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemSnapshot } from 'src/app/creator/services/creator.service';
import { HistoryService } from 'src/app/creator/services/history.service';

@Component({
  selector: 'app-history-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-panel.component.html',
  styleUrls: ['./history-panel.component.css']
})

export class HistoryPanelComponent {

  history:ItemSnapshot[]; 
  show:boolean = false;
  toggle(){
    this.show = !this.show;
  }

  constructor(private history_serv:HistoryService){
    this.history_serv.getHistory().subscribe(hist => this.history = hist)
  }

  showVisible(i:number):boolean{
    return this.history_serv.currentIndex  == i ;
  }

  restoreHistory(i:number){
    this.history_serv.getPreviousItemSnapshot(i);
  }
}
