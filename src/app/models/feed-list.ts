export interface IFeedConfig {
  type: FeedType;
  filters: IFeedFilter;
}

export interface IFeedFilter {
  author?: string;
  favorite?: string;
  limit?: number;
  offset?: number;
}

export enum FeedType {
  Global,
  Own,
  Favorite,
}
