
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { maestrosUTL } from '../maestrosUTL';
import { MaestrosapiService } from '../maestrosapi.service';

@Component({
  selector: 'app-editar-maestro',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html'
})
export class Editar implements OnInit {

  idmaestro: number = 0;
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
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idmaestro = Number(
      this.route.snapshot.paramMap.get('idmaestro')
    );

    this.servicio.getMaestro(this.idmaestro).subscribe({
      next: (response: any) => {
        this.maestro = response.maestro;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al consultar maestro:', error);
        this.mensaje = 'No se pudo consultar el maestro';
        this.cdr.markForCheck();
      }
    });
  }

  guardarCambios(): void {
    this.servicio.editarMaestro(this.idmaestro, this.maestro).subscribe({
      next: () => {
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al editar maestro:', error);
        this.mensaje = 'No se pudo editar el maestro';
        this.cdr.markForCheck();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/maestros']);
  }
}
