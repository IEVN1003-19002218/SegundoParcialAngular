
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { maestrosUTL } from '../maestrosUTL';
import { MaestrosapiService } from '../maestrosapi.service';

@Component({
  selector: 'app-agregar-maestro',
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar.html'
})
export class Agregar {

  mensaje: string = '';

  maestro: maestrosUTL = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private servicio: MaestrosapiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  guardarMaestro(): void {
    const datos = {
      idmaestro: String(this.maestro.idmaestro),
      nombre: this.maestro.nombre,
      apaterno: this.maestro.apaterno,
      amaterno: this.maestro.amaterno,
      correo: this.maestro.correo
    };

    this.servicio.agregarNuevoMaestro(datos).subscribe({
      next: () => {
        this.router.navigate(['/utl/maestros']);
      },

error: (error) => {
  console.error('Error al registrar maestro:', error);
  this.mensaje = error.error?.mensaje || 'No se pudo registrar el maestro';
  this.cdr.markForCheck();
}

    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/maestros']);
  }


}
