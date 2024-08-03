// html-to-image.service.ts
import { Injectable } from '@angular/core';
import { StorageService } from '@ollieestudio/fire-lib';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private storage:StorageService){

  }
  
  convertElementToImage(element: HTMLElement, scale: number = 2): Promise<string> {
    return html2canvas(element, {
      scale,
      useCORS: true, // Enables cross-origin resource sharing if you have external resources
      backgroundColor: null // Ensures it respects the element's background
    }).then(canvas => canvas.toDataURL('image/png'));
  }

  public uploadImg(file: any, filename: string, path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    this.storage.uploadImage(file.replace('data:image/png;base64, ', ''), path + filename)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

}
