
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { alumnosUTL } from '../alumnosUTL';
import { ProyectoapiService } from '../alumnosapi.service';

@Component({
  selector: 'app-editar',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html'
})
export class Editar implements OnInit {

  matricula: number = 0;
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
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.matricula = Number(
      this.route.snapshot.paramMap.get('matricula')
    );

    this.servicio.getAlumno(this.matricula).subscribe({
      next: (response: any) => {
        const datos = response.alumno;

        this.alumno = {
          matricula: datos.matricula,
          nombre: datos.nombre,
          apaterno: datos.apaterno ?? datos['apellido paterno'],
          amaterno: datos.amaterno ?? datos['apellido materno'],
          correo: datos.correo
        };

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al consultar alumno:', error);
        this.mensaje = 'No se pudo consultar el alumno';
        this.cdr.markForCheck();
      }
    });
  }

  guardarCambios(): void {
    this.servicio.editarAlumno(this.matricula, this.alumno).subscribe({
      next: () => {
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al modificar alumno:', error);
        this.mensaje = 'No se pudo modificar el alumno';
        this.cdr.markForCheck();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/alumnos']);
  }
}
