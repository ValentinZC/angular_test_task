import { Component, Input } from '@angular/core';
import { IArticle } from '../../models/article';

@Component({
  selector: 'app-post-previewer',
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.scss'],
})
export class PreviewPostComponent {
  @Input() article: IArticle;

  public toggleFavorite(isFavorite: boolean): void {
    this.article.favorited = isFavorite;

    isFavorite
      ? (this.article.favoritesCount += 1)
      : (this.article.favoritesCount -= 1);
  }
}
