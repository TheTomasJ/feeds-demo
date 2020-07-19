import { TestBed } from '@angular/core/testing';

import { CommentBotService } from './comment-bot.service';

describe('CommentBotService', () => {
  let service: CommentBotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentBotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
