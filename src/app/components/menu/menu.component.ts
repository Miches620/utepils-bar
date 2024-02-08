import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Bebidas } from 'src/app/interfaces/bebidas';
import { Comidas } from 'src/app/interfaces/comidas';
import { Tickets } from 'src/app/interfaces/tickets';
import { AgregarAlPedidoService } from 'src/app/services/agregar-al-pedido.service';
import { ObtenerMenuService } from 'src/app/services/obtener-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  webMenuCervezas: Bebidas[] = [];
  webMenuBebidas: Comidas[] = [];
  webMenuComidas: Comidas[] = [];
  
  pedidoActual: Tickets[]=[];

  pedido:boolean=false;
  itemsPedido:number=0;
  totalPedido:number=0;

constructor(private menu:ObtenerMenuService, private agregarPedido:AgregarAlPedidoService){

  
}
ngOnInit(): void {

   this.menu.obtenerBebidas().subscribe((cervezas) =>{
  this.webMenuCervezas=cervezas;
  });

  this.menu.obtenerBebidas2().subscribe((bebidas) =>{
    this.webMenuBebidas=bebidas;
  });

  this.menu.obtenerComidas().subscribe((comidas) =>{
    this.webMenuComidas=comidas;
  });

  this.agregarPedido.verPedido().subscribe(data=>{
    this.itemsPedido=data.length;
    this.pedidoActual=data;
    if(this.itemsPedido>0){
      this.pedido=true;
    }
  })
 
}

agregarAlPedido(id: number, producto: string) {
  const webMenu: (Bebidas | Comidas)[] = [...this.webMenuCervezas, ...this.webMenuBebidas, ...this.webMenuComidas];
  // Busca si ya existe un pedido con el mismo producto
  const pedidoExistente = this.pedidoActual.find(item => item.producto === producto);

  if (pedidoExistente) {
    // Si existe, incrementa la cantidad y actualiza el total
    pedidoExistente.cantidad += 1;
    
    const nuevoPedido: Tickets = {
      id: pedidoExistente.id,
      producto: pedidoExistente.producto,
      cantidad: pedidoExistente.cantidad,
      precio: pedidoExistente.precio
    };
    this.agregarPedido.modificarPedido(pedidoExistente.id,nuevoPedido).subscribe(data =>{
      //console.log(this.pedidoActual);
    })
  } else {
    // Si no existe, agrega un nuevo pedido
    const item = webMenu.find(item => item.producto === producto);

    if (item) {
      const precio: number = item.precio;
      const cantidad: number = 1;
      const nuevoPedido: Tickets = { id, producto, cantidad, precio };
      this.pedidoActual.push(nuevoPedido);
      this.agregarPedido.agregarAlPedido(nuevoPedido).subscribe(data =>{
      });
    }
  }

  // Actualiza el totalPedido solo una vez después de procesar el pedido
  this.totalPedido = this.pedidoActual.reduce((total, item) => total + item.cantidad * item.precio, 0);
  this.ngOnInit();
  this.itemsPedido += 1;
  this.pedido = true;

  //refrescar el OnInit() de pedido
}


getNumeros(repeticiones?: number): number[] {
  return Array(repeticiones).fill(0).map((x, i) => i + 1);
}

}
