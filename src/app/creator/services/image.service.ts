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
  
  removeColor(base64Image: string, color: { r: number, g: number, b: number }): Promise<string> {
    const image = new Image();
    image.src = base64Image;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    return new Promise<string>((resolve) => {
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx?.drawImage(image, 0, 0);

        const imgData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData?.data;

        if (data && ctx) {
          for (let i = 0; i < data.length; i += 4) {
            if (data[i] === color.r && data[i + 1] === color.g && data[i + 2] === color.b) {
              data[i + 3] = 0; // Set alpha to 0 (transparent)
            }
          }

          ctx.putImageData(imgData, 0, 0);
          resolve(canvas.toDataURL());
        } else {
          resolve('');
        }
      };
    });
  }

  convertChildNodesToImage(element: HTMLElement, scale: number = 2): Promise<void> {
    const promises = Array.from(element.children).map(async (subelem: HTMLElement) => {
          if (subelem.classList.contains('element-item')) {
              try {
                  const img = await this.convertSVGToImage(subelem, scale);
                  if(img) subelem.innerHTML = `<img src="${img}" style="width:100%; height:100%" />`;
              } catch (error) {
                  console.error('Error converting element to image:', error);
              }
          }
      });
      return Promise.all(promises).then(() => {
      }).catch((error) => {
          console.error('Error converting child nodes to images:', error);
      });
  }

  convertSVGToImage(subelem: any, scale: number) {
    return subelem.firstChild?.firstChild?.attributes[0]?.nodeValue;
  }

  convertElementToImage(element: HTMLElement, scale: number = 2): Promise<string> {
    
    return html2canvas(element, {
      scale,
      useCORS: true, 
      backgroundColor: null,
      allowTaint: true, 
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
