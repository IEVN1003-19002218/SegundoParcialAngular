
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ProyectoapiService } from '../alumnosapi.service';

@Component({
  selector: 'app-eliminar',
  imports: [CommonModule],
  templateUrl: './eliminar.html'
})
export class Eliminar {

  matricula: number = 0;
  mensaje: string = '';

  constructor(
    private servicio: ProyectoapiService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.matricula = Number(
      this.route.snapshot.paramMap.get('matricula')
    );
  }

  eliminarAlumno(): void {
    this.servicio.eliminarAlumno(this.matricula).subscribe({
      next: () => {
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al eliminar alumno:', error);
        this.mensaje = 'No se pudo eliminar el alumno';
        this.cdr.markForCheck();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/alumnos']);
  }
}
