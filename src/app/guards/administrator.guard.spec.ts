import { TestBed } from '@angular/core/testing';

import { AdministratorGuard } from './administrator.guard';

describe('AdministratorGuard', () => {
  let guard: AdministratorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdministratorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
