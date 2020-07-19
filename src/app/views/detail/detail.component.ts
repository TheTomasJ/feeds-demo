import { Component, OnInit } from '@angular/core';
import { FeedsService } from 'src/app/services/feeds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Feed } from 'src/app/models/feeds';
import { HooksWatcher } from 'src/app/models/hooks-watcher';
import { SessionService } from 'src/app/services/session.service';
import { FakeSocketEventsService } from 'src/app/services/fake-socket-events.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends HooksWatcher implements OnInit {

  private detailID: string = this.route.snapshot.paramMap.get('id'); 
  public editMode: boolean = this.detailID === 'new';
  public liked: boolean;

  public formGroup: FormGroup;
  public fetched: Feed;

  public commentGroup: FormGroup = this.getGroup();

  constructor(
    private feeds: FeedsService,
    private route: ActivatedRoute,
    private router: Router,
    public session: SessionService,
    private fakeSockets: FakeSocketEventsService
  ) {
    super();
    this.commentGroup.patchValue({
      name: session.displayName
    });
  }

  ngOnInit(): void {
    if(this.detailID === 'new') {
      this.inject(null);
    } else {
      this.fetchByID();
    }

    this.fakeSockets.feedCommented
      .pipe(this.takeUntilDestroyed())
      .subscribe(feedID => {
        if(feedID === this.fetched.id) {
          this.fetchByID();
        }
      });
  }

  private fetchByID(): void {
    this.feeds.getFeed(+this.detailID)
      .pipe(this.takeUntilDestroyed())
      .subscribe(feed => {
        this.inject(feed);
      });
  }

  private getGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(),
      text: new FormControl(),
      timestamp: new FormControl(),
      likes: new FormControl()
    });
  }

  private inject(data: Feed): void {
    this.fetched = data;

    if(!this.formGroup) {
      this.formGroup = this.getGroup();
    }

    if(data) {
      this.formGroup.patchValue(data);
    } else {
      this.formGroup.patchValue({
        name: '',
        text: '',
        timestamp: Date.now(),
        likes: 0
      });
    }
  }

  public submit(): void {
    if(this.fetched) {
      Object.assign(this.fetched, this.formGroup.value);
      this.feeds.updateFeed(Object.assign({}, this.fetched))
        .pipe(this.takeUntilDestroyed())
        .subscribe(() => {
          this.editMode = false;
        });
    } else {
      this.formGroup.patchValue({
        timestamp: Date.now()
      });

      this.feeds.createFeed(this.formGroup.value)
        .pipe(this.takeUntilDestroyed())
        .subscribe(() => {
          this.fakeSockets.simulateFeedCreated();
          this.router.navigateByUrl('/feeds');
        });
    }
  }

  public likeToggle(): void {
    this.formGroup.get('likes').setValue(
      this.formGroup.get('likes').value + (this.liked ? -1 : 1)
    );
    this.liked = !this.liked
    this.submit();
  }

  public submitComment(): void {
    this.commentGroup.patchValue({
      timestamp: Date.now()
    });

    this.feeds.createComment(this.fetched.id, this.commentGroup.value)
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        this.commentGroup.patchValue({
          text: '',
        });
        this.fetchByID();
      });
  }

  public removeComment(id: number): void {
    this.feeds.deleteComment(id)
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        this.fetchByID();
      });
  }

  public deleteFeed(): void {
    this.feeds.deleteFeed(this.fetched.id)
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        this.router.navigateByUrl('/feeds');
      });
  }
}
