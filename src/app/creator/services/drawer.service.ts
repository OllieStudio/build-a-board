import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  public closeToolbox: boolean = true;
  public closedrawer: boolean = true;

  constructor() { }


  closeToolBox(){
    if(!this.closeToolbox) this.closeToolbox = true;
  }

  closeDrawer() {
    if(!this.closedrawer) this.closedrawer = true;
  }

  toggleDrawer() {
    this.closedrawer = !this.closedrawer;
  }

  toggleToolbox(){
    this.closeToolbox = !this.closeToolbox;
  }

}
