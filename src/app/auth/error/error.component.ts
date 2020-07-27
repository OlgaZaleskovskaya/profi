import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']

})
export class ErrorComponent implements OnInit {
  isLoading = false;
  email: string
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.email = '';
  }


}