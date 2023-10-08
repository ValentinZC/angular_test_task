import { Injectable } from '@angular/core';
import { IErrors } from '../models/errors';

@Injectable({
  providedIn: 'root',
})
export class ErrorListService {
  public getErrorList(errors: IErrors | null): string {
    return errors
      ? Object.keys(errors.errors || {})
          .map(name => `${name} ${errors.errors[name]}\n`)
          .join('')
      : '';
  }
}
