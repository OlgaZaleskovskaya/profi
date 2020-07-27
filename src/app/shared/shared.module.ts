import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../material/angular-material.module';
import { CapitalFirstLetterPipe } from './capitalFirstLetter.pipe';


@NgModule({
  imports: [CommonModule,

  ],
  declarations: [
    CapitalFirstLetterPipe,
  //  HighlightDirective,
   // ExponentialStrengthPipe
    //AngularMaterialModule,
  ],
  exports: [
    CommonModule,
    //CapitalFirstLetterPipe,
    AngularMaterialModule,
    CapitalFirstLetterPipe,
   // HighlightDirective,
   // ExponentialStrengthPipe
  ]
})
export class SharedModule { }
