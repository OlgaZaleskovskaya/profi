import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as CategoriesActions from '../categories/store/categories.actions';
import { AuthService } from '../auth/auth.service';
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


  onLoginError(error: string) {
  /*   let dialogRef = this.dialog.open(ErrorComponent, {
      data: error,
    }); */
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
