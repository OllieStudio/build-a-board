import { Component } from '@angular/core';
import { CreatorUIService } from 'src/app/creator/services/creator.service';
import { HistoryService } from 'src/app/creator/services/history.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public creator:CreatorUIService, public history:HistoryService) {
    console.log("teste")
  }
}
