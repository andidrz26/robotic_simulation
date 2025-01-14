import { TestBed } from '@angular/core/testing';

import { EulerService } from './euler.service';

describe('EulerService', () => {
  let service: EulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
