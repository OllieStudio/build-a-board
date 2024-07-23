import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { Section } from "../interfaces/section";
import { Website } from '../interfaces/website';

@Component({
  selector: 'app-icon-section',
  templateUrl: './iconset.component.html',
  styleUrls: ['./iconset.component.css']
})
export class IconsetComponent extends HeaderComponent implements OnInit  {
  @Input()  section:Section = {} as Section;
  @Input() website:Website = {} as Website;
  
  constructor(public sanitizer:DomSanitizer) {
    super(sanitizer);
  }

  ngOnInit() {
  }

  sanitizeSection(url:string){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

}
