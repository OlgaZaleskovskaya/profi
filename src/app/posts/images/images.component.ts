import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GalleryComponent } from '../gallery/gallery.component';


export interface ImgData {
  path: any;
  width: number;
  height: number;

}

const CLASS_HEIGHT_MAP = {
  'twoH': 1,
  'twoV': 0.75,
  'threeV': 1,
  'threeH': 1,
  'fourV': 1,
  'fourH': 1,
  'fourSq': 1,
  'fiveV': 1,
  'fiveH': 0.75,

};
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],

})

export class ImagesComponent implements OnInit {
  images: any[] = [];
  totalWidth: number;
  totalHeight: number;
  mainHeight: number;
  totalWidthString: string;
  mainClass: Object;
  aspect0: number;
  orientation: string;
  width0: number;
  width1: number;


  @Input() imagesData: { path: string, width: number, height: number }[];


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.totalWidth = 486;
    this.images = this.imagesData.map(img => {
      return {
        ...img,
        path: img.path,
        orientation: (img.width / img.height > 1) ? 'h' : 'v'
      }
    });

    this.orientation = this.images.reduce(function (sum, current) {
      return sum + current['orientation'];
    }, '');
    this.mainClass = this.setMainContainerClass();
    this.totalHeight = CLASS_HEIGHT_MAP[Object.keys(this.mainClass)[0]] * this.totalWidth
  }

  public getTotalHeight(): string {
    return this.totalHeight + 'px'
  }

  public getTotalWidth(): string {
    return this.totalWidth + 'px';
  }

  private setMainContainerClass(): Object {
    switch (this.imagesData.length) {
      case 1:
        return { "one": true };

      case 2:
        if (this.orientation == "hh") {
          return { "twoH": true };
        }
        return { "twoV": true };

      case 3:
        if (this.orientation == "hhh"
          || this.orientation == "vhh"
          || this.orientation == "hvh"
          || this.orientation == "hhv"
        ) {
          return { "threeH": true };
        }
        return { "threeV": true };
      case 4:
        if (this.orientation == "hhhh" || this.orientation == "vvvv") {
          return { "fourSq": true };
        } else
          if (this.orientation.substr(0, 1) == "h"
          ) {
            return { "fourH": true };
          }
        return { "fourV": true };
      case 5:
        if (this.orientation.substr(3, 3) == "hhh") {
          return { "fiveH": true };
        }
        return { "fiveV": true };

      default:
    }
  }


  toImages() {
    if (this.images.length > 1) {
      const paths = this.imagesData.map(item => item.path);
      this.dialog.open(GalleryComponent, {
        height: '100vh',
        width: '100vw',
        data: { pathArray: paths }
      });
    }
  }


}
