import { TestBed } from '@angular/core/testing';

import { QuaternionService } from './quaternion.service';

describe('QuaternionService', () => {
  let service: QuaternionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuaternionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
