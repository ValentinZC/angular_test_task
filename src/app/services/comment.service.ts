import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  IComment,
  ICommentPayload,
  ICommentResponse,
  ICommentsResponse,
} from '../models/comment';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private articleService: ArticleService
  ) {}

  public getAll(slug: string): Observable<IComment[]> {
    return this.http
      .get<ICommentsResponse>(`/articles/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  public create(slug: string, body: string): Observable<IComment> {
    const payload: ICommentPayload = { comment: { body } };

    return this.http
      .post<ICommentResponse>(`/articles/${slug}/comments`, payload)
      .pipe(map(data => data.comment));
  }

  public removeById(slug: string, commentId: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}/comments/${commentId}`);
  }
}
