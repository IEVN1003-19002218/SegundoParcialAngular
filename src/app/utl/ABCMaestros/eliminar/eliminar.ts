
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MaestrosapiService } from '../maestrosapi.service';

@Component({
  selector: 'app-eliminar-maestro',
  imports: [CommonModule],
  templateUrl: './eliminar.html'
})
export class Eliminar {

  idmaestro: number = 0;
  mensaje: string = '';

  constructor(
    private servicio: MaestrosapiService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.idmaestro = Number(
      this.route.snapshot.paramMap.get('idmaestro')
    );
  }

  eliminarMaestro(): void {
    this.servicio.eliminarMaestro(this.idmaestro).subscribe({
      next: () => {
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al eliminar maestro:', error);
        this.mensaje = 'No se pudo eliminar el maestro';
        this.cdr.markForCheck();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/maestros']);
  }
}
