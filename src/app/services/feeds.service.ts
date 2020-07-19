import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feed, Comment } from '../models/feeds';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedsService {

  constructor(private http: HttpClient) {
  }

  public getFeeds(): Observable<Feed[]> {
    return this.http.get<Feed[]>(environment.feedsURI + '/feeds');
  }

  public getFeed(id: number): Observable<Feed> {
    return this.http.get<Feed>(environment.feedsURI + '/feed/' + id);
  }

  public getFeedLikesCount(id: number): Observable<number> {
    return this.http.get<number>(environment.feedsURI + '/feed/' + id + '/like/count');
  } 

  public getFeedCommentsCounts(id: number): Observable<number> {
    return this.http.get<number>(environment.feedsURI + '/feed/' + id + '/comment/count');
  } 

  public createFeed(feed: Feed): Observable<Feed> {
    return this.http.put<Feed>(environment.feedsURI + '/feed/', feed);
  }

  public updateFeed(feed: Feed): Observable<Feed> {
    return this.http.put<Feed>(environment.feedsURI + '/feed/' + feed.id, feed);
  }

  public deleteFeed(feedID: number): Observable<unknown> {
    return this.http.delete(environment.feedsURI + '/feed/' + feedID);
  }

  public deleteComment(commentID: Comment): Observable<unknown> {
    return this.http.delete(environment.feedsURI + '/comment/' + commentID);
  }
}
