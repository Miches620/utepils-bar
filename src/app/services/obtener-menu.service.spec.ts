import { TestBed } from '@angular/core/testing';

import { ObtenerMenuService } from './obtener-menu.service';

describe('ObtenerMenuService', () => {
  let service: ObtenerMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
