import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


export interface ImgData {
  path: any;
  width: number;
  height: number;

}

const CLASS_HEIGHT_MAP = {
  'two': 0.5,
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
  @ViewChild('myDiv', { read: ElementRef, static: false }) myDiv: ElementRef;



  images: any[] = [];
  totalWidth: number;
  totalHeight: number;
  mainHeight: number;
  totalWidthString: string;
  mainClass: Object;
  aspect0: number;
  orientation: string;

  isOpen: boolean;
  width0: number;
  width1: number;
  path1: any;
  path2: any;

  @Input() imagesData: { path: string, width: number, height: number }[];


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
//this.path1 =   this.sanitizer.bypassSecurityTrustStyle('url(http://localhost:3000/images/ffff0-1595863787777.jpg)');

  //  this.path2 =   this.sanitizer.bypassSecurityTrustStyle('url(http://localhost:3000/images/ffff1-1595863787816.jpg)');

    this.totalWidth = 486;
    this.isOpen = false;

    this.images = this.imagesData.map(img => {
      console.log('path', this.imagesData );
      return {
        ...img,
        //   path: this.sanitizer.bypassSecurityTrustStyle('url(' + img.path + ')'),
        path: img.path,
        orientation: (img.width / img.height > 1) ? 'h' : 'v'
      }
    });

    this.orientation = this.images.reduce(function (sum, current) {
      return sum + current['orientation'];
    }, '');

    console.log('orientation', this.orientation);

    this.mainClass = this.setMainContainerClass();
    if (Object.keys(this.mainClass)[0] == "two") {
      this.totalHeight = this.getRowHeight(this.imagesData[0], this.imagesData[1]);
    } else {
      this.totalHeight = CLASS_HEIGHT_MAP[Object.keys(this.mainClass)[0]] * this.totalWidth;
    }


  }


  ngAfterViewInit() {
    //this.totalWidth = this.myDiv.nativeElement.offsetWidth;
    // console.log('totalWidth', this.totalWidth);
    //  this.height = Math.round((this.totalWidth * 0.64 / this.aspect0)) + "px"
  }

  ngAfterViewChecked() {
    // this.totalWidth = this.myDiv.nativeElement.offsetWidth;
    //this.height = Math.round((this.totalWidth * 0.64 / this.aspect0)) + "px"
  }

  show() {
    this.isOpen = true;
  }




  public getTotalHeight(): string {
    return this.totalHeight + 'px'
  }

  public getTotalWidth(): string {
    return this.totalWidth + 'px';
  }



  private getRowHeight(img0: ImgData, img1: ImgData): number {
    const aspect0 = img0.width / this.imagesData[0].height;
    const aspect1 = img1.width / this.imagesData[1].height;
    const height = Math.min((this.totalWidth * 0.5) / aspect0, (this.totalWidth * 0.5) / aspect1);
    return height;
  }



  private setMainContainerClass(): Object {
    switch (this.imagesData.length) {
      case 1:
        return { "one": true };

      case 2:
        return { "two": true };
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
      // code block
    }
  }


  toImages(){

  }


}
