import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from '../utils/constants';

@Pipe({
  name: 'InstantFormat'
})
export class  InstantFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, Constants.INSTANT_FMT);
  }

}
