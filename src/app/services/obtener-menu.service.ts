import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bebidas } from "../interfaces/bebidas";
import { Comidas } from "../interfaces/comidas";


@Injectable({
  providedIn: 'root'
})
export class ObtenerMenuService {

  url:string="http://localhost:3000/";
  constructor(private http:HttpClient) { }

  obtenerBebidas():Observable<Bebidas[]>{
 return this.http.get<Bebidas[]>(this.url+"Cervezas");
  }

  obtenerComidas():Observable<Comidas[]>{
    return this.http.get<Comidas[]>(this.url+"Comidas");
  }

  obtenerBebidas2():Observable<Comidas[]>{
    return this.http.get<Comidas[]>(this.url+"Bebidas");
  }
  
}
