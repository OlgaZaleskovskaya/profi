import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material/angular-material.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './auth/store/auth.effects';
import { CategoriesEffects } from './categories/store/categories.effects';
import { PostsEffects } from './posts/store/posts.effects';
import * as fromApp from './store/app.reducer';

import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';

import { AppComponent } from './app.component';
import { PostsModule } from './posts/posts.module';

import { CreateCategoryComponent } from './categories/createCategory/create-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CategoriesModule } from './categories/categories.module';
import { GalleryComponent } from './posts/gallery/gallery.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateCategoryComponent,
    GalleryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CategoriesModule,
    SharedModule,
    AuthModule,
    PostsModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, CategoriesEffects, PostsEffects]),

  ],
  exports: [ ],

  entryComponents: [GalleryComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
