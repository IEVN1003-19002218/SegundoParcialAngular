
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { alumnosUTL } from '../alumnosUTL';
import { ProyectoapiService } from '../alumnosapi.service';

@Component({
  selector: 'app-agregar',
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar.html'
})
export class Agregar {

  mensaje: string = '';

  alumno: alumnosUTL = {
    matricula: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private servicio: ProyectoapiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  guardarAlumno(): void {

    const datos = {
      matricula: String(this.alumno.matricula),
      nombre: this.alumno.nombre,
      apaterno: this.alumno.apaterno,
      amaterno: this.alumno.amaterno,
      correo: this.alumno.correo
    };

    this.servicio.agregarNuevoAlumno(datos).subscribe({
      next: () => {
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al registrar alumno:', error);
        this.mensaje = 'No se pudo registrar el alumno';
        this.cdr.markForCheck();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/alumnos']);
  }
}
