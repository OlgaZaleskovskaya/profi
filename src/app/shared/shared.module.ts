import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../material/angular-material.module';
import { CapitalFirstLetterPipe } from './capitalFirstLetter.pipe';
import { PlaceholderDirective } from './placeholder.directive';


@NgModule({
  imports: [CommonModule,

  ],
  declarations: [
    CapitalFirstLetterPipe,
    PlaceholderDirective
  //  HighlightDirective,
   // ExponentialStrengthPipe
    //AngularMaterialModule,
  ],
  exports: [
    CommonModule,
    //CapitalFirstLetterPipe,
    AngularMaterialModule,
    CapitalFirstLetterPipe,
    PlaceholderDirective
   // HighlightDirective,
   // ExponentialStrengthPipe
  ]
})
export class SharedModule { }
