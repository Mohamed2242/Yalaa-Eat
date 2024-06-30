import { TestBed } from '@angular/core/testing';

import { GetAndSetOrderIdService } from './get-and-set-order-id.service';

describe('GetAndSetOrderIdService', () => {
  let service: GetAndSetOrderIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAndSetOrderIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
