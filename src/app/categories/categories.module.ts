import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories.component';
//import { CapitalFirstLetterPipe } from './capitalFirstLetter.pipe';
import { CommonModule } from '@angular/common';
import { MyTestPipe } from './mytest.pipe';




@NgModule({
  declarations: [
    CategoriesComponent,
    MyTestPipe,
  //  CapitalFirstLetterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // CapitalFirstLetterPipe,
    SharedModule
  ],
  exports: [
    CategoriesComponent,
    // CapitalFirstLetterPipe,
  ]
  // entryComponents: [EmailComponent]
})
export class CategoriesModule { }
