
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { maestrosUTL } from './maestrosUTL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaestrosapiService {

  private url = 'http://127.0.0.1:5000/api/maestros/';

  constructor(private http: HttpClient) {}

  getMaestros(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getMaestro(idmaestro: number): Observable<any> {
    return this.http.get<any>(this.url + idmaestro);
  }

  agregarNuevoMaestro(datos: {
    idmaestro: string;
    nombre: string;
    apaterno: string;
    amaterno: string;
    correo: string;
  }) {
    return this.http.post(this.url, datos);
  }

  editarMaestro(idmaestro: number, datos: maestrosUTL) {
    return this.http.put(this.url + idmaestro, datos);
  }

  eliminarMaestro(idmaestro: number) {
    return this.http.delete(this.url + idmaestro);
  }
}
