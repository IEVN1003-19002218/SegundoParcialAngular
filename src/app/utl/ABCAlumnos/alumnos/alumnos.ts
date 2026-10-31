
import { alumnosUTL } from './../alumnosUTL';
import { AlumnoFilterPipe } from '../alumnos-filter.pipe';
import { ProyectoapiService } from '../alumnosapi.service';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumnos',
  imports: [FormsModule, RouterLink, AlumnoFilterPipe, CommonModule],
  templateUrl: './alumnos.html',
})
export class Alumnos implements OnInit {

  listFilter: string = '';
  alumnoTitle: string = '';
  dataSource: alumnosUTL[] = [];

  constructor(
    public alumnosUTL: ProyectoapiService,
    private cdr: ChangeDetectorRef
  ) {}

  alumnosIric: alumnosUTL[] = [
    {
      matricula: 1234,
      nombre: 'Pedro',
      apaterno: 'Lopez',
      amaterno: 'Muñoz',
      correo: 'pedro@gmail.com'
    }
  ];

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosUTL.getAlumnos().subscribe({
      next: (response: any) => {
        console.log('Datos recibidos del API:', response);
        this.dataSource = response.alumnos;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al consultar la API:', error);
        this.cdr.markForCheck();
      },
      complete: () => {
        console.log('Carga de alumnos finalizada');
      }
    });
  }
}
