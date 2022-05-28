import { TestBed } from '@angular/core/testing';

import { VigilantGuard } from './vigilant.guard';

describe('VigilantGuard', () => {
  let guard: VigilantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VigilantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
