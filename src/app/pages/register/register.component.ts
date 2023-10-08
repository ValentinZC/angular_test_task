import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthForm, IAuthRegister } from '../../models/auth';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { emailValidator, passwordValidator } from '../../helpers/validators';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { authSuccess } from '../../constants/messages';
import { ErrorListService } from '../../services/error-list.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  public form: FormGroup<IAuthForm>;

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private errorListService: ErrorListService
  ) {
    this.form = new FormGroup<IAuthForm>({
      email: new FormControl('', {
        validators: [emailValidator, Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [passwordValidator, Validators.required],
        nonNullable: true,
      }),
      username: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.form.disable();

    const observable = this.userService.register(
      this.form.value as IAuthRegister
    );

    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.snackbarService.openSnackbar(authSuccess.register);
        this.router.navigate(['/login']);
      },
      error: errors => {
        const strErrors = this.errorListService.getErrorList(errors);
        this.snackbarService.openSnackbar(strErrors, 'snackbar-error');
        this.form.enable();
      },
    });
  }
}
