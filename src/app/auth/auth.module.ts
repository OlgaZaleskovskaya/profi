import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../material/angular-material.module';


import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PasswordConfirmValidatorDirective } from './signup/passwordConfirmValidator/passwordConfirmValidator.directive';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    LoginComponent,
    PasswordConfirmValidatorDirective,
    SignupComponent,
    AuthComponent, ErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AuthRoutingModule
  ],
  // entryComponents: [EmailComponent]
})
export class AuthModule { }
