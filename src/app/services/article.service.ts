import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FeedType, IFeedConfig } from '../models/feed-list';
import { map, Observable } from 'rxjs';
import { IArticle, IArticlesResponse } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  public getArticles(config: IFeedConfig): Observable<IArticlesResponse> {
    let params = new HttpParams();
    Object.keys(config.filters).map(key => {
      // @ts-ignore
      params = params.set(key, config.filters[key]);
    });

    return this.http.get<IArticlesResponse>(
      `/articles${config.type === FeedType.Favorite ? '/feed' : ''}`,
      { params }
    );
  }

  public get(slug: string): Observable<IArticle> {
    return this.http
      .get<{ article: IArticle }>(`/articles/${slug}`)
      .pipe(map(data => data.article));
  }

  public remove(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}`);
  }

  public send(payload: Partial<IArticle>, slug?: string): Observable<IArticle> {
    const request = slug
      ? this.http.put<{ article: IArticle }>(`/articles/${slug}`, {
          article: payload,
        })
      : this.http.post<{ article: IArticle }>('/articles', {
          article: payload,
        });

    return request.pipe(map(data => data.article));
  }

  public liked(slug: string): Observable<IArticle> {
    return this.http
      .post<{ article: IArticle }>(`/articles/${slug}/favorite`, {})
      .pipe(map(data => data.article));
  }

  public unLiked(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}/favorite`);
  }
}
