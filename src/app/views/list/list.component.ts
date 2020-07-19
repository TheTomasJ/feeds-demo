import { Component, OnInit } from '@angular/core';
import { FeedsService } from 'src/app/services/feeds.service';
import { HooksWatcher } from 'src/app/models/hooks-watcher';
import { Feed } from 'src/app/models/feeds';
import { FormControl } from '@angular/forms';

const escape: RegExp = new RegExp(/[.*+?^${}()|[\]\\]/g);

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends HooksWatcher implements OnInit {

  public displayedFeeds: Feed[] = [];
  private allFeeds: Feed[] = [];
  public filter: FormControl = new FormControl('');

  constructor(private feeds: FeedsService) {
    super();
  }

  ngOnInit(): void {
    this.feeds.getFeeds()
      .pipe(this.takeUntilDestroyed())
      .subscribe(feeds => {
        this.allFeeds = feeds;
        this.applyFilter();
      });
    
    this.filter.valueChanges
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        this.applyFilter();
      });
  }

  private applyFilter(): void {
    const regFilter = new RegExp('.*' + (this.filter.value as string).toLocaleLowerCase().split('').map(s => s.replace(escape, '\\$&')).join('.{0,3}') + '.*');
    this.displayedFeeds = this.allFeeds.filter(f => regFilter.test((f.name + f.text).toLocaleLowerCase()));
  }

}
