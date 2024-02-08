import { TestBed } from '@angular/core/testing';

import { AgregarAlPedidoService } from './agregar-al-pedido.service';

describe('AgregarAlPedidoService', () => {
  let service: AgregarAlPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarAlPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
