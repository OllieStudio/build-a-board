// html-to-image.service.ts
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  convertElementToImage(element: HTMLElement, scale: number = 2): Promise<string> {
    return html2canvas(element, {
      scale,
      useCORS: true, // Enables cross-origin resource sharing if you have external resources
      backgroundColor: null // Ensures it respects the element's background
    }).then(canvas => canvas.toDataURL('image/png'));
  }
}
