import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appPasswordConfirmValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordConfirmValidatoreDirective,
    multi: true
  }]
})
export class PasswordConfirmValidatoreDirective implements Validator {
  @Input() appPasswordConfirmValidator: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.parent.get(this.appPasswordConfirmValidator);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { 'notEqual': true };
    }
    return null;
  }


}
