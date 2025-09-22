import { TestBed } from '@angular/core/testing';

import { PixabayWallApiService } from './pixabay-wall-api.service';

describe('PixabayWallApiService', () => {
  let service: PixabayWallApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixabayWallApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
