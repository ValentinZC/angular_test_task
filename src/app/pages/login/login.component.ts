import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IAuthForm, IAuthLogin } from "../../models/auth";
import { emailValidator, passwordValidator } from "../../helpers/validators";
import { UserService } from "../../services/user.service";
import { Subject, takeUntil } from "rxjs";
import { Router } from "@angular/router";
import { SnackbarService } from "../../services/snackbar.service";
import { ErrorListService } from "../../services/error-list.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{
  public form: FormGroup<IAuthForm>;

  private destroy$ = new Subject<void>()

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private errorListService: ErrorListService
  ) {
    this.form = new FormGroup<IAuthForm>({
      email: new FormControl('', {
        validators: [emailValidator, Validators.required],
        nonNullable: true
      }),
      password: new FormControl('', {
        validators: [passwordValidator, Validators.required],
        nonNullable: true
      })
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete()
  }

  public onSubmit(): void {
    this.form.disable();

    this.userService.login(this.form.value as IAuthLogin)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          this.snackbarService.openSnackbar(this.errorListService.getErrorList(err), 'snackbar-error');
          this.form.enable()
        }
      })
  }
}
