import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { WebsiteService } from '../core/website.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTitle:String = 'Benvindo';
  editmode:boolean = false;
  catalogmode:boolean = false;
  
  constructor(public homeservice:HomeService, public websiteservice:WebsiteService) { }

  ngOnInit() {

  }

}
