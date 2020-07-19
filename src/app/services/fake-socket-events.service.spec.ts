import { TestBed } from '@angular/core/testing';

import { FakeSocketEventsService } from './fake-socket-events.service';

describe('FakeSocketEventsService', () => {
  let service: FakeSocketEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeSocketEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
