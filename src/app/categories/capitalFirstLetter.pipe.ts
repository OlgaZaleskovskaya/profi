import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalLetter'})

export class CapitalFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    return value[0].toUpperCase() + value.substr(1).toLowerCase();
  }
}
