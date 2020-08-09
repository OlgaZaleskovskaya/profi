import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { Subscription } from 'rxjs';
import { ErrorComponent } from './error/error.component';
import * as AuthActions from './store/auth.actions';
import { MatDialog } from '@angular/material/dialog';



@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit, OnDestroy, AfterViewInit {
  authSubscription: Subscription;
  closeSubscription: Subscription;
  errorMessage: string;
  authMessage: string;
  isLoading: boolean;
  myDialog: any;


  constructor(private store: Store<fromApp.AppState>,
    public dialog: MatDialog) { }

  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {

  }


  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').subscribe(state => {
      this.isLoading = state.isLoading;
      this.errorMessage = state.authError;
      if (this.errorMessage != null) {
        this.showErrorAlert(this.errorMessage, "error")
      }
      this.authMessage = state.authMessage;
      if (this.authMessage != null) {

        this.showErrorAlert(this.authMessage, "message")
      }
    });

  }

  private showErrorAlert(message: string, type: string, name?: string) {
    this.myDialog = this.dialog.open(ErrorComponent, {
      height: 'auto',
      width: 'auto',
      data: { message: message, type: type, name: name }
    });

    this.store.dispatch(new AuthActions.RemoveMessage());
  }


}


