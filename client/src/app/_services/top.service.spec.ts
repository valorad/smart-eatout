import { TestBed } from '@angular/core/testing';

import { TopService } from './top.service';

describe('TopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopService = TestBed.get(TopService);
    expect(service).toBeTruthy();
  });
});
