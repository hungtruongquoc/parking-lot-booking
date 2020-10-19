import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'toLocaleTime'})
export class ToLocalTime implements PipeTransform {
  transform(value: any, ...args) {
    try {
      const currentDateVal = new Date(value * 1000);
      return currentDateVal.toLocaleString();
    } catch (exception) {
      return 'Invalid date time value';
    }
  }
}
