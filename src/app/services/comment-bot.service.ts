import { Injectable } from '@angular/core';
import { FeedsService } from './feeds.service';
import { Subject, timer } from 'rxjs';
import { FakeSocketEventsService } from './fake-socket-events.service';
import { HooksWatcher } from '../models/hooks-watcher';
import { Feed } from '../models/feeds';
import { take, filter } from 'rxjs/operators';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

@Injectable({
  providedIn: 'root'
})
export class CommentBotService extends HooksWatcher {

  private lastFeed: Feed;
  private lastBot: string;
  private freeComments: number;

  constructor(
    private fakeSockets: FakeSocketEventsService,
    private feeds: FeedsService
  ) {
    super();

    fakeSockets.feedCreated
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        this.feeds.getFeeds()
          .pipe(take(1))
          .subscribe(feeds => {
            this.lastFeed = feeds[feeds.length - 1];
            this.freeComments = 4;
          });
      });
  }

  public startBots(): void {
    this.startBot('Andrej Vesely');
    this.startBot('Viliam Smutny');
  }

  public startBot(name: string): void {

    timer(3000, 500)
      .pipe(
        filter(() => Math.random() < 0.05),
        this.takeUntilDestroyed()
      )
      .subscribe(() => {
        if(this.freeComments && this.lastFeed && this.lastBot !== name) {
          this.lastBot = name;
          this.freeComments--;

          const from = Math.random() * LOREM.length;
          const feedID = this.lastFeed.id;

          this.feeds.createComment(feedID, {
            timestamp: Date.now(),
            name: name,
            text: LOREM.substr(from, (LOREM.length - from) * Math.random())
          })
            .pipe(take(1))
            .subscribe(() => {
              this.fakeSockets.simulateFeedCommented(feedID);
            });
        }
      });
  }
}
