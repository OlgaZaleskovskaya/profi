import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { changePictureTrigger } from './changeImg';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],


})
export class GalleryComponent implements OnInit {
  slides: string[];
  currentIndex: number;
  currentImg: string;
  status: boolean;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GalleryComponent>
  ) { };
  ngOnInit(): void {

    this.slides = this.data.pathArray;
    this.currentIndex = 0;
    this.currentImg = this.slides[this.currentIndex];
  }
  onNext(i: number) {

    if (this.currentIndex == this.slides.length - 1 && i == 1) {
      this.currentIndex = 0;
      this.currentImg = this.slides[this.currentIndex];
    } else if (this.currentIndex == 0 && i == -1) {
      this.currentIndex = this.slides.length - 1
      this.currentImg = this.slides[this.currentIndex];

    } else {
      this.currentIndex += i;
      this.currentImg = this.slides[this.currentIndex];

    }

  }

  onClose() {
    this.dialogRef.close();
  }
}
