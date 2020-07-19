import { Component, OnInit } from '@angular/core';
import { FeedsService } from 'src/app/services/feeds.service';
import { HooksWatcher } from 'src/app/models/hooks-watcher';
import { Feed } from 'src/app/models/feeds';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends HooksWatcher implements OnInit {

  public displayedFeeds: Feed[] = [];

  constructor(private feeds: FeedsService) {
    super();
  }

  ngOnInit(): void {
    this.feeds.getFeeds()
      .pipe(this.takeUntilDestroyed())
      .subscribe(feeds => {
        this.displayedFeeds = feeds;
      });
  }

}
