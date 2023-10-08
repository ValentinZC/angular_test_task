import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { IArticle } from '../../models/article';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-heard-button',
  templateUrl: './heard-button.component.html',
})
export class HeardButtonComponent implements OnDestroy {
  public destroy$ = new Subject<void>();
  public isSubmitted = false;

  @Input() article: IArticle;
  @Output() toggle = new EventEmitter<boolean>();

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleBtn(): void {
    this.isSubmitted = true;

    this.userService.isAuthenticated
      .pipe(
        switchMap(() => {
          return this.article.favorited
            ? this.articleService.unLiked(this.article.slug)
            : this.articleService.liked(this.article.slug);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.isSubmitted = false;
          this.toggle.emit(!this.article.favorited);
        },
        error: () => (this.isSubmitted = false),
      });
  }
}
