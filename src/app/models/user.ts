import { IAuthor } from './article';

export interface IUser {
  email: string;
  username: string;
  token: string;
}

export interface IProfileResponse {
  profile: IAuthor;
}
