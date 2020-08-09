import { ValidatorFn, AbstractControl } from '@angular/forms';

export function maxImgQuantityValidator(max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {

    let files = c.value as File[];
    if (files) {
      if (files.length < max) {
        console.log("valid")
        return null;
      }
    }
    console.log("invalid")
    return { 'maxLengthArray': true };
  };
}

