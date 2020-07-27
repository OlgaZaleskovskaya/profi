import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../material/angular-material.module';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';
import { ErrorComponent } from './error/error.component';
import { CreateAccountComponent } from './createAccount/createAccount.component';
import { CreateUserComponent } from './createUser/createUser.component';
import { PasswordConfirmValidatoreDirective } from './passwordConfirmValidator.directive';



@NgModule({
  declarations: [
    EmailComponent,
    PasswordComponent,
    ErrorComponent,
    CreateAccountComponent,
    CreateUserComponent,
    PasswordConfirmValidatoreDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
 // entryComponents: [EmailComponent]
})
export class AuthModule { }
