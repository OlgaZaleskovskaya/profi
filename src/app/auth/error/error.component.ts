import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']

})
export class ErrorComponent {
  type: boolean;
  name: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, type: string, name: string },
    public dialogRef: MatDialogRef<ErrorComponent>,
    private router: Router
  ) { };

  onClose() {
    this.dialogRef.close();
    this.router.navigate(['']);
  }

  onRepeat() {

    this.dialogRef.close();
    this.router.navigate(['auth/login']);
  }
}
