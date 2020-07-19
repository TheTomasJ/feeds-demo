import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeSocketEventsService {

  public feedCreated: Subject<void> = new Subject(); 
  public feedCommented: Subject<number> = new Subject(); 

  constructor() { }

  public simulateFeedCreated(): void {
    this.feedCreated.next();
  }

  public simulateFeedCommented(feedID: number): void {
    this.feedCommented.next(feedID);
  }

}
