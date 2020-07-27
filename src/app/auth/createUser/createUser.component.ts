import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { User } from '../auth.model';

@Component({
  templateUrl: './createUser.component.html',
  styleUrls: ['../email/email.component.scss', './createUser.component.scss']

})
export class CreateUserComponent implements OnInit {
  isLoading: false;

  isValidFormSubmitted: boolean;
  newUser: User;

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.newUser = { ...this.authService.newUser };
    console.log('create user', this.newUser.role);
  }

  onSignup(f: NgForm) {
    console.log(f.form.controls.name.value);
    this.dialogRef.close();
    ////
  }

}
