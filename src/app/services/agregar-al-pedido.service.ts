import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tickets } from '../interfaces/tickets';

@Injectable({
  providedIn: 'root'
})
export class AgregarAlPedidoService {

  url:string="http://localhost:3000/";
  constructor(private http:HttpClient) { }

  verPedido():Observable<Tickets[]>{
    return this.http.get<Tickets[]>(this.url+"Pedido");
  }

  agregarAlPedido(pedido:Tickets):Observable<Tickets>{
  return this.http.post<Tickets>(this.url+"Pedido", pedido);
  }

  modificarPedido(id:number,producto:Tickets):Observable<Tickets[]>{
    return this.http.put<Tickets[]>(this.url+"Pedido/"+id,producto);
  }

  borrarPedido(id:number):Observable<void>{
    return this.http.delete<void>(this.url+"Pedido/"+id);
  }

}
