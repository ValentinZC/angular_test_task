import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEditorForm } from '../../models/article';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ErrorListService } from '../../services/error-list.service';
import { POST_CREATE_SUCCESS } from '../../constants/messages';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
})
export class PostEditorComponent implements OnDestroy, OnInit {
  public editorForm: FormGroup<IEditorForm>;
  public isSubmitting = false;
  public destroy$ = new Subject<void>();
  public isLoading = false;

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackbarService,
    private errorListService: ErrorListService
  ) {
    this.editorForm = new FormGroup<IEditorForm>({
      title: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      description: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      body: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params['slug']) {
      this.isLoading = true;

      combineLatest([
        this.articleService.get(this.route.snapshot.params['slug']),
        this.userService.getCurrentUser(),
      ])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([article, { user }]) => {
          if (user.username === article.author.username) {
            this.editorForm.patchValue(article);
          } else {
            this.router.navigate(['/']);
          }

          this.isLoading = false;
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submit(): void {
    this.isSubmitting = true;
    this.editorForm.disable();

    const slug = this.route.snapshot.params['slug'];

    this.articleService
      .send({ ...this.editorForm.value }, slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: article => {
          this.snackBarService.openSnackbar(POST_CREATE_SUCCESS);
          this.router.navigate(['article/', article.slug]);
        },
        error: err => {
          this.snackBarService.openSnackbar(
            this.errorListService.getErrorList(err),
            'snackbar-error'
          );
          this.isSubmitting = false;
          this.editorForm.enable();
        },
      });
  }
}
