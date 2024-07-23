import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MaterializeService } from '@ollieestudio/fire-lib';
import { Crm } from './interfaces/crm';
import { Website } from './interfaces/website';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit, OnChanges {
  @Input() public website:Website;
  @Input() banners: Crm[];

  constructor( public materialize:MaterializeService) { }

  ngOnChanges(changes: SimpleChanges): void {
   if(changes.banners){
    this.materialize.initSlider('.slider', {height:'40vh' })
   }
  }

  ngOnInit() {
    
  }

  trackByFn(index, item) {
    return item.id;
  }

  
  

}
