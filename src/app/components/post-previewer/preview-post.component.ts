import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from "../../models/article";
import { map, Observable } from "rxjs";
import { CommentService } from "../../services/comment.service";

@Component({
  selector: 'app-post-previewer',
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.scss']
})
export class PreviewPostComponent{
  @Input() article: IArticle;

  public toggleFavorite(isFavorite: boolean): void {
    this.article.favorited = isFavorite

    isFavorite ? this.article.favoritesCount += 1 : this.article.favoritesCount -= 1
  }
}
