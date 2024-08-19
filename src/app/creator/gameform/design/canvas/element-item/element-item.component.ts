import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
import { ElementsService } from 'src/app/creator/services/elements.service';

@Component({
  selector: 'app-element-item',
  template: `
    <div>
      {{ content }}
    </div>
  `
})
export class ElementItemComponent implements AfterViewInit {
  @Input() data:any;
  content: string = '';

  constructor(private elRef: ElementRef, private service:ElementsService) {}

  ngAfterViewInit() {
    // Manipulate the DOM here
    //this.elRef.nativeElement.style.backgroundColor = 'lightblue';
    
    switch (this.data.type) {
      case 'text':
        this.service.addTextElement(this.data, this.elRef.nativeElement.id);
        break;
      case 'element':
        this.service.addSvgElement(this.data.template, this.elRef.nativeElement.id);
        break;
      case 'image':
        this.service.addImageElement(this.data.template, this.elRef.nativeElement.id);
        break;
    
      default:
        break;
    }
  }
}
