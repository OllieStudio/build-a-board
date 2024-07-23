import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Section } from "../interfaces/section";
import { Website } from '../interfaces/website';

@Component({
  selector: 'app-header-section',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() section:Section;
  @Input() website:Website;

  showLogin:boolean = false;
 
  constructor( public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  sanitizeSection(url:string){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

}
