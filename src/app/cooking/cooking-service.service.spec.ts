import { TestBed } from '@angular/core/testing';

import { CookingServiceService } from './cooking-service.service';

describe('CookingServiceService', () => {
  let service: CookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
