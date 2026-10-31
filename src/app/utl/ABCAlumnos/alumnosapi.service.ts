
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { alumnosUTL } from './alumnosUTL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {

  private url = 'http://127.0.0.1:5000/api/alumnos/';

  constructor(private http: HttpClient) {}

  public getAlumnos(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getAlumno(matricula: number) {
    return this.http.get<any>(this.url + matricula);
  }

  agregarNuevoAlumno(datos: {
    matricula: string;
    nombre: string;
    apaterno: string;
    amaterno: string;
    correo: string;
  }) {
    return this.http.post(this.url, datos);
  }

  editarAlumno(matricula: number, datos: alumnosUTL) {
    return this.http.put(this.url + matricula, datos);
  }

  eliminarAlumno(matricula: number) {
    return this.http.delete(this.url + matricula);
  }
}
