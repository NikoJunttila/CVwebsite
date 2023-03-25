import { TestBed } from '@angular/core/testing';

import { CookingService } from './cooking-service.service';

describe('CookingServiceService', () => {
  let service: CookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
