import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarStyle } from '../models/snackbar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(
    message: string,
    className?: SnackbarStyle | SnackbarStyle[],
    time?: number,
    hPos?: MatSnackBarHorizontalPosition,
    vPos?: MatSnackBarVerticalPosition
  ): void {
    this.snackBar.open(message, 'close', {
      duration: time || 3000,
      horizontalPosition: hPos || 'right',
      verticalPosition: vPos || 'top',
      panelClass: className || 'snackbar-success',
    });
  }
}
