import { Component, OnInit } from '@angular/core';
import { Tickets } from 'src/app/interfaces/tickets';
import { AgregarAlPedidoService } from 'src/app/services/agregar-al-pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  pedidoActual: Tickets[] = [];

  cantidad: number = 0;
  totalPedido:number = 0;

  constructor(private agregarPedido:AgregarAlPedidoService){
    
  }
  ngOnInit(): void {

    this.agregarPedido.verPedido().subscribe(data=>{
      this.pedidoActual=data;
      for(let item of data){
        this.totalPedido+=item.precio*item.cantidad;
      }
    });

  }

  sumarProducto(index: number) {
    this.pedidoActual[index].cantidad++;
    this.totalPedido+=this.pedidoActual[index].precio;
    this.actualizarTotal();
    const nuevoPedido: Tickets = {
      id: this.pedidoActual[index].id,
      producto: this.pedidoActual[index].producto,
      cantidad: this.pedidoActual[index].cantidad,
      precio: this.pedidoActual[index].precio
    };
    this.agregarPedido.modificarPedido(this.pedidoActual[index].id,nuevoPedido).subscribe(data =>{
      //console.log(this.pedidoActual);
    })
    //console.log("total PEDIDO:" + this.totalPedido);
  }

  restarProducto(index: number) {
    if (this.pedidoActual[index].cantidad > 1) {
      this.pedidoActual[index].cantidad--;
      this.totalPedido-=this.pedidoActual[index].precio;
      this.actualizarTotal();
      const nuevoPedido: Tickets = {
        id: this.pedidoActual[index].id,
        producto: this.pedidoActual[index].producto,
        cantidad: this.pedidoActual[index].cantidad,
        precio: this.pedidoActual[index].precio
      };
      this.agregarPedido.modificarPedido(this.pedidoActual[index].id,nuevoPedido).subscribe(data =>{
        //console.log(this.pedidoActual);
      })
    }
  }

  eliminarProducto(index: number) {
  if (index > -1) {
    this.agregarPedido.borrarPedido(this.pedidoActual[index].id).subscribe(data=>{
      //console.log(this.pedidoActual);
    })
    const eliminado = this.pedidoActual[index];
    const nuevoPedido: Tickets[] = this.pedidoActual.filter((item, i) => i !== index);
    
    // Actualizar el array original
    this.pedidoActual = nuevoPedido;
    
    // Actualizar el total restando el valor del elemento eliminado
    this.totalPedido -= eliminado.cantidad * eliminado.precio;
    
    this.actualizarTotal();

    //refrescar el OnInit() de menu
  }
}

  
  actualizarTotal() {
    // Recalcular el total cada vez que se realice un cambio
    this.totalPedido = this.pedidoActual.reduce((total, item) => total + item.cantidad * item.precio, 0);
  }
  

}
