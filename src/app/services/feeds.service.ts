import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feed, Comment } from '../models/feeds';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SessionService } from './session.service';

const additionalDataDelimiter: string = ':|:|:';

@Injectable({
  providedIn: 'root',
})
export class FeedsService {

  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) {
  }

  private parser: (feed: Feed) => Feed = (feed: Feed) => {
    if(feed?.text && !feed.isParsed) {
      const idx = feed.text.lastIndexOf(additionalDataDelimiter);
      if(idx !== -1) {
        const text = feed.text.substr(0, idx);
        const data = feed.text.substr(idx + 5);
        
        try {
          const parsed: {
            author?: string,
          } = JSON.parse(data);
          
          feed.parsedAuthor = parsed.author;
          feed.text = text;
        } catch {
          console.warn('Wrong data ', data);
        }
      }

      if(!feed.parsedAuthor) {
        feed.parsedAuthor = 'Unknown Author';
      }

      feed.isParsed = true;
    }

    return feed;
  }

  private serialize(feed: Feed): Feed {
    const result = Object.assign({}, feed);

    let author: string;

    if(result.parsedAuthor) {
      author = result.parsedAuthor;
    } else if(!result.id && this.session.data) {
      author = this.session.data.name;
    }

    if(author) {
      result.text += additionalDataDelimiter + JSON.stringify({
        author: author
      });
    }

    result.isParsed = false;

    return result;
  }

  public getFeeds(): Observable<Feed[]> {
    return this.http.get<Feed[]>(environment.feedsURI + '/feeds')
      .pipe(map(e => e.map(this.parser)));
  }

  public getFeed(id: number): Observable<Feed> {
    return this.http.get<Feed>(environment.feedsURI + '/feed/' + id)
      .pipe(map(this.parser));
  }

  public getFeedLikesCount(id: number): Observable<number> {
    return this.http.get<number>(environment.feedsURI + '/feed/' + id + '/like/count');
  } 

  public getFeedCommentsCounts(id: number): Observable<number> {
    return this.http.get<number>(environment.feedsURI + '/feed/' + id + '/comment/count');
  } 

  public createFeed(feed: Feed): Observable<unknown> {
    return this.http.put(environment.feedsURI + '/feed/', this.serialize(feed));
  }

  public updateFeed(feed: Feed): Observable<unknown> {
    return this.http.put(environment.feedsURI + '/feed/' + feed.id, this.serialize(feed));
  }

  public createComment(feedID: number, comment: Comment): Observable<unknown> {
    return this.http.put(environment.feedsURI + '/feed/' + feedID + '/comment', comment);
  }

  public deleteFeed(feedID: number): Observable<unknown> {
    return this.http.delete(environment.feedsURI + '/feed/' + feedID);
  }

  public deleteComment(commentID: number): Observable<unknown> {
    return this.http.delete(environment.feedsURI + '/comment/' + commentID);
  }
}
