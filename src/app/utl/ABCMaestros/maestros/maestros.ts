
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { maestrosUTL } from '../maestrosUTL';
import { MaestroFilterPipe } from '../maestros-filter.pipe';
import { MaestrosapiService } from '../maestrosapi.service';

@Component({
  selector: 'app-maestros',
  imports: [CommonModule, FormsModule, RouterLink, MaestroFilterPipe],
  templateUrl: './maestros.html'
})
export class Maestros implements OnInit {

  listFilter: string = '';
  dataSource: maestrosUTL[] = [];
  mensaje: string = '';

  constructor(
    private servicio: MaestrosapiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.servicio.getMaestros().subscribe({
      next: (response: any) => {
        console.log('Datos recibidos del API:', response);
        this.dataSource = response.Maestros;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al consultar maestros:', error);
        this.mensaje = 'No se pudieron consultar los maestros';
        this.cdr.markForCheck();
      }
    });
  }
}
