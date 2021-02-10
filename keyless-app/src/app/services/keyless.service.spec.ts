import { TestBed } from '@angular/core/testing';

import { KeylessService } from './keyless.service';

describe('KeylessService', () => {
  let service: KeylessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeylessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
