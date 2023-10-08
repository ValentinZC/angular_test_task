import { Component, OnInit } from '@angular/core';
import { FeedType, IFeedFilter, IFeedConfig } from '../../models/feed-list';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public postFeedConfig: IFeedConfig;

  protected readonly FeedType = FeedType;

  ngOnInit(): void {
    this.postFeedConfig = {
      type: FeedType.Global,
      filters: {},
    };
  }

  setFeed(type: FeedType, filters: IFeedFilter = {}): void {
    this.postFeedConfig = { type, filters };
  }
}
