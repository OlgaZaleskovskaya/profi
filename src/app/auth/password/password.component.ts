import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './password.component.html',
  styleUrls: ['../email/email.component.scss']

})
export class PasswordComponent implements OnInit {

 // isLoading = false;
  password: string;
  constructor(public dialogRef: MatDialogRef<PasswordComponent>) {
  }

  ngOnInit(): void {
    this.password = '';
  }

  onSubmit(f:  NgForm) {
    this.password = f.value.password;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close({password:this.password });
  }

}
