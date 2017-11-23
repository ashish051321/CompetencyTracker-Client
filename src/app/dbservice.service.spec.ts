import { TestBed, inject } from '@angular/core/testing';

import { DBserviceService } from './dbservice.service';

describe('DBserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DBserviceService]
    });
  });

  it('should be created', inject([DBserviceService], (service: DBserviceService) => {
    expect(service).toBeTruthy();
  }));
});
