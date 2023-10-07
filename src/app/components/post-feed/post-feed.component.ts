import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { EMPTY_LIST } from "../../constants/feedList";
import { FeedType, IFeedConfig } from "../../models/feed-list";
import { IArticle } from "../../models/article";
import { ArticleService } from "../../services/article.service";
import { map, Subject, takeUntil } from "rxjs";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { UserService } from "../../services/user.service";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit, OnDestroy, OnChanges{
  public articles: IArticle[];
  public isLoad = false;
  public articlesCount: number;
  public isFollowingFeed: boolean;
  public currentPage = 1;

  @Input() config: IFeedConfig;
  private username: string | undefined;
  private destroy$= new Subject<void>();
  private limit = 10
  protected readonly EMPTY_LIST = EMPTY_LIST;
  protected readonly FeedType = FeedType;

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {

  }

  ngOnInit() {
    this.userService.currentUser
      .pipe(map(user => user?.username))
      .subscribe(username => this.username = username);

    this.getFeed();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['config']) {
      this.getFeed();
    }
  }

  public setPostFeedByPaginator(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getFeed();
  }

  public toggleFeed(event: MatSlideToggleChange): void {
    this.config.type = event.checked ? FeedType.Favorite : FeedType.Own;
    this.isFollowingFeed = event.checked;

    this.getFeed();
  }

  public getFeed(): void {
    this.isLoad = true;
    this.articles = [];
    this.config.filters = {};

    if (this.username && this.config.type === FeedType.Own) {
      this.currentPage = 1;
      this.config.filters.author = this.username;
      this.config.type = this.isFollowingFeed ? FeedType.Favorite : FeedType.Own;
    }


    if(this.limit) {
      this.config.filters.limit = this.limit;
      this.config.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articleService.getArticles(this.config)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.isLoad = false;
        this.articles = data.articles;
        this.articlesCount = data.articlesCount;
      })
  }
}
