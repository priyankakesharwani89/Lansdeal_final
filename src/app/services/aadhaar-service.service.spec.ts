import { TestBed, inject } from '@angular/core/testing';

import { AadhaarServiceService } from './aadhaar-service.service';

describe('AadhaarServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AadhaarServiceService]
    });
  });

  it('should be created', inject([AadhaarServiceService], (service: AadhaarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
