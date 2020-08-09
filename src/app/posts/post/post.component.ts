import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../shared/images.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  slides: string[]
  constructor(public imgSrv: ImageService) { }
  ngOnInit(): void {
    this.slides = this.imgSrv.slides;

  }



}
