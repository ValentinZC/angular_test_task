import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleService } from "../../services/article.service";
import { CommentService } from "../../services/comment.service";
import { UserService } from "../../services/user.service";
import { IArticle } from "../../models/article";
import { IComment } from "../../models/comment";
import { combineLatest, Subject, takeUntil, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SnackbarService } from "../../services/snackbar.service";
import { INVALID_ARTICLE } from "../../constants/messages";
import { IUser } from "../../models/user";
import { FormControl } from "@angular/forms";
import { ErrorListService } from "../../services/error-list.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy{
  public article: IArticle;
  public comments: IComment[] = [];
  public commentFormControl: FormControl<string>;
  public isEditable = false;
  public isSubmitting = false;

  private currentUser: IUser | null;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private commentService: CommentService,
    private articleService: ArticleService,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private errorListService: ErrorListService
  ) {
  }

  ngOnInit(): void {
    this.commentFormControl = new FormControl<string>('', { nonNullable: true });
    const slug = this.route.snapshot.params['slug'];

    combineLatest([
      this.articleService.get(slug),
      this.commentService.getAll(slug),
      this.userService.getCurrentUser()
    ])
      .pipe(
        catchError(err => {
          this.router.navigate(['/'])
          this.snackbarService.openSnackbar(INVALID_ARTICLE, 'snackbar-error')
          return throwError(err)
        })
      )
      .subscribe(([article, comments, { user}]) => {
        this.article = article;
        this.comments = comments;
        this.currentUser = user;

        this.isEditable = this.currentUser?.username === this.article.author.username;
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onRemoveComment(comment: IComment): void {
    this.commentService
      .removeById(this.article.slug, comment.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.comments = this.comments.filter(item => item.id !== comment.id)
      })
  }

  public onSendComment(): void {
    this.isSubmitting = true;

    this.commentService.create(this.article.slug, this.commentFormControl.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (comment) => {
          this.comments.unshift(comment);
          this.commentFormControl.reset('');
          this.isSubmitting = false;
        },
        error: (errors) => {
          this.isSubmitting = false;
          this.snackbarService.openSnackbar(this.errorListService.getErrorList(errors), 'snackbar-error');
        },
      });
  }

  public trackById(index: number, item: IComment): string {
    return item.id
  }
}
