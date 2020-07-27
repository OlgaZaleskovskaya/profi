import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './createAccount.component.html',
  styleUrls: ['../email/email.component.scss', './createAccount.component.scss']

})
export class CreateAccountComponent{
  isLoading = false;
  role: string;
  password: string;

  isValidFormSubmitted: boolean;

  constructor(public dialogRef: MatDialogRef<CreateAccountComponent>) {
  }


  onSubmit(form:NgForm){
    if(form.invalid){
     return;
    }
    this.dialogRef.close({role: form.value.role});
  }
}
