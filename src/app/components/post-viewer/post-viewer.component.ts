import { Component, Input, OnDestroy } from '@angular/core';
import { IArticle, IAuthor } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.scss'],
})
export class PostViewerComponent implements OnDestroy {
  @Input() article: IArticle;
  @Input() isEditable: boolean;

  public isRemoving: boolean;
  public destroy$: Subject<void> = new Subject<void>();

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFollowing(author: IAuthor): void {
    this.article.author.following = author.following;
  }

  public toggleFavorite(isFavorite: boolean): void {
    this.article.favorited = isFavorite;

    isFavorite
      ? (this.article.favoritesCount += 1)
      : (this.article.favoritesCount -= 1);
  }

  public removeArticle(slug: string): void {
    this.isRemoving = true;

    this.articleService
      .remove(slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isRemoving = false;
        this.router.navigate(['/']);
      });
  }
}
