import { TestBed } from '@angular/core/testing';

import { NavbarControllService } from './navbar-controll.service';

describe('NavbarControllService', () => {
  let service: NavbarControllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarControllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
