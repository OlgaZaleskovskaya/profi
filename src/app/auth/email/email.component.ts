import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']

})
export class EmailComponent implements OnInit, OnDestroy {
  isLoading = false;
  email: string;
  createAccount: Object;

  constructor(public dialogRef: MatDialogRef<EmailComponent>) {
  }
  ngOnInit(): void {
    this.email = '';
    this.createAccount = { message: this.email };
  }

  onSubmit(f: NgForm) {
    this.email = f.value.email;
    this.dialogRef.close({ email: this.email });
  }



  ngOnDestroy(){

  }


}
