import { IAuthor } from "./article";

export interface IComment {
  id: string;
  createdAt: string;
  author: IAuthor
  body: string;
}

export interface ICommentResponse {
  comment: IComment
}

export interface ICommentsResponse {
  comments: IComment[]
}

export interface ICommentPayload {
  comment: {
    body: string
  }
}
