import { FormControl } from '@angular/forms';

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

export interface IArticlesResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface IAuthor {
  username: string;
  following: boolean;
}

export interface IEditorForm {
  title: FormControl<string>;
  description: FormControl<string>;
  body: FormControl<string>;
}
