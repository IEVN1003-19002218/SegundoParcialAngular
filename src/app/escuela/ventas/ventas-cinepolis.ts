
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IVenta } from '../venta';

@Component({
  selector: 'app-ventas',
  imports: [RouterLink, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas {

  formulario!: FormGroup;
  indiceEdicion: number = -1;
  mensaje: string = '';

  nuevaVenta: IVenta = {
    nombre: '',
    compradores: 0,
    boletos: 0,
    tarjeta: '',
    total: 0
  };

  ventas: IVenta[] = [];

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(1),
      boletos: new FormControl(1),
      tarjeta: new FormControl('no')
    });

    this.ventas = JSON.parse(
      localStorage.getItem('ventasCinepolis') || '[]'
    );

  }

  editarVenta(index: number): void {

    this.nuevaVenta = {
      ...this.ventas[index]
    };

    const venta = this.ventas[index];

    this.formulario.patchValue({
      nombre: venta.nombre,
      compradores: venta.compradores,
      boletos: venta.boletos,
      tarjeta: venta.tarjeta
    });

    this.indiceEdicion = index;
    this.mensaje = '';

  }

  GuardarCambios(): void {

    this.mensaje = '';

    if (this.indiceEdicion === -1) {
      return;
    }

    this.nuevaVenta.nombre = this.formulario.value.nombre;
    this.nuevaVenta.compradores = Number(this.formulario.value.compradores);
    this.nuevaVenta.boletos = Number(this.formulario.value.boletos);
    this.nuevaVenta.tarjeta = this.formulario.value.tarjeta;

    if (this.nuevaVenta.nombre.trim() === '' ||
        this.nuevaVenta.compradores <= 0 ||
        this.nuevaVenta.boletos <= 0) {

      this.mensaje = 'Todos los datos son obligatorios';
      return;
    }

    if (this.nuevaVenta.boletos > this.nuevaVenta.compradores * 7) {

      this.mensaje = 'Solo puedes comprar 7 boletos por persona';
      return;
    }

    // Calcular precio
    let total = this.nuevaVenta.boletos * 12;

    // Descuento por boletos
    if (this.nuevaVenta.boletos > 5) {
      total = total - total * 0.15;
    }
    else if (this.nuevaVenta.boletos >= 3) {
      total = total - total * 0.10;
    }

    // Descuento por tarjeta
    if (this.nuevaVenta.tarjeta == 'si') {
      total = total - total * 0.10;
    }

    this.nuevaVenta.total = total;

    // Modificar venta
    this.ventas[this.indiceEdicion] = {...this.nuevaVenta};

    // Guardar en localStorage
    localStorage.setItem(
      'ventasCinepolis',
      JSON.stringify(this.ventas)
    );

    // Ocultar formulario
    this.indiceEdicion = -1;

  }

  EliminarVenta(index: number): void {

    this.ventas.splice(index, 1);

    localStorage.setItem(
      'ventasCinepolis',
      JSON.stringify(this.ventas)
    );

    this.indiceEdicion = -1;
    this.mensaje = '';

  }

  CancelarEdicion(): void {

    this.indiceEdicion = -1;
    this.mensaje = '';

  }

}
