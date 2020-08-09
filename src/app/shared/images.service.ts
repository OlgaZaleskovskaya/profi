import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  slides: string[];

  setSlides(slides: string[]) {
    this.slides = slides;
    console.log("service", this.slides );
  }

}
