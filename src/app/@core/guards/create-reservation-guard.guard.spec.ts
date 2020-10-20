import { TestBed } from '@angular/core/testing';

import { CreateReservationGuardGuard } from './create-reservation-guard.guard';

describe('CreateReservationGuardGuard', () => {
  let guard: CreateReservationGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CreateReservationGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
