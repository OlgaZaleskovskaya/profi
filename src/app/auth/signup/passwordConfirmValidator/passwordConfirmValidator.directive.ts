import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appPasswordConfirmValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordConfirmValidatorDirective,
    multi: true
  }]
})

export class PasswordConfirmValidatorDirective implements Validator {
  @Input() appPasswordConfirmValidator: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.parent.get(this.appPasswordConfirmValidator);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { 'notEqual': true };
    }
    return null;
  }

}
