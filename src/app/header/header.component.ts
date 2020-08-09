import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as CategoriesActions from '../categories/store/categories.actions';


//import { EmailComponent } from '../auth/email/email.component';
// { PasswordComponent } from '../auth/password/password.component';
import { ErrorComponent } from '../auth/error/error.component';
//import { CreateAccountComponent } from '../auth/createAccount/createAccount.component';
import { AuthService } from '../auth/auth.service';
// { CreateUserComponent } from '../auth/createUser/createUser.component';
import { User, Role } from '../auth/auth.model';
import { CreateCategoryComponent } from '../categories/createCategory/create-category.component';
import { Category } from '../categories/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userName: string;
  userRole: string;
  authSubscription: Subscription;
  categorySubsciption: Subscription;
  currentCategory: Category;
  email: string;
  password: string;
  isLoading: boolean;
  error: string;
  constructor(private store: Store<fromApp.AppState>, public dialog: MatDialog, private authService: AuthService) { }



  ngOnInit(): void {

    this.authSubscription = this.store.select('auth').subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      if (state.user != null) {
        this.userName = state.user.name;
        this.userRole = state.user.role;
      } else {
        this.userName = '';
      }
      this.isLoading = state.isLoading;
    })
    this.categorySubsciption = this.store.select('categories')
      .subscribe(state => this.currentCategory = state.currentCategory)
  };

  openLoginDialog() {

    /*  let dialogRef = this.dialog.open(EmailComponent);
     dialogRef.afterClosed().subscribe((result: string | { email: string }) => {
       if (!result) { return };
       if (typeof result == 'string') {
         this.authService.newUser.email = result;
         this.onCreateAccount();
       } else {
         this.authService.newUser.email = result.email;
         this.onEnterPassword();
       }
     }); */
  }

  onEnterPassword() {
    /*   let dialogRef = this.dialog.open(PasswordComponent, { data: { email: this.email } });
      dialogRef.afterClosed().subscribe(res => {
        if (typeof res == "object") {
          this.authService.newUser.password = res.password;
          this.authService.onLogin();
        } else {
          switch (res) {
            case "forgetPassword":

              break;
            case "cancel":

              break;
            default:

              break;
          }
        }
      }); */

  }

  onLoginError(error: string) {
  /*   let dialogRef = this.dialog.open(ErrorComponent, {
      data: error,
    }); */
  }

  onCreateAccount() {
    /*   let dialogRef = this.dialog.open(CreateAccountComponent);
      dialogRef.afterClosed().subscribe((result: null | { role: string }) => {
        if (result) {
          if(result.role == "master"){
             this.authService.newUser.role = Role.Master;
          } else{
            this.authService.newUser.role = Role.Customer;
          }

          this.onCreateUser();
        }
      }) */
  }

  private onCreateUser() {
    /*   let dialogRef = this.dialog.open(CreateUserComponent);
      dialogRef.afterClosed().subscribe((result: null | { user: User }) => {
        if (result != null) {
          this.authService.newUser = result.user;
          this.authService.onSignUp();
        }
      }) */
  }

  onCreateCategory() {
    let dialogRef = this.dialog.open(CreateCategoryComponent);
    dialogRef.afterClosed().subscribe((result: null | { name: string, tags: string[] }) => {
      if (result != null) {
        this.store.dispatch(new CategoriesActions.AddCategoryStart(result));
      }
    })
  }

  onUpdateCategory() {
    let dialogRef = this.dialog.open(CreateCategoryComponent, { data: this.currentCategory });
    dialogRef.afterClosed().subscribe((result: null | { category: Category }) => {
      if (result != null) {
        this.store.dispatch(new CategoriesActions.UpdateCategoryStart(result));
      }
    })
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }


  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.categorySubsciption.unsubscribe();
  }
}
