import { Data } from '@angular/router';



export class Comment {
  id: string;
  content: string;
  date: Date;
  authorId: string;
  constructor(id: string, content: string, date: Date, authorId: string) {
    this.id = id;
    this.content = content;
    this.date = date;
    this.authorId = authorId;
  }
};


export class Post {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public date: Data,
    public authorId: string,
    public authorName: string,
    public tags: string[],
    public imageData: { path: string, width?: number, height?: number }[],
    public comments?: Comment[],

  ) { }

};

type IMG = "img";
type MOV = "mov";

export class Img {
  imgUrl: string;
  type: IMG | MOV
}

export interface ICreatePostData {
 readonly tags: string[],
 readonly title: string,
 readonly content: string,
 readonly images?: File[]
}

