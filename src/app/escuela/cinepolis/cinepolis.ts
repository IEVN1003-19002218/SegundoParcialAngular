import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IVenta } from '../venta';
@Component({
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis {
  formulario!: FormGroup;
  nombre: string = '';
  compradores: number = 0;
  boletos: number = 0;
  tarjeta: string = '';

  precio: number = 12.0;
  total: number = 0;
  descuento: number = 0;
  ValorPagar: number = 0;

  mensaje: string = '';
  ventas: IVenta[] = [];

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(1),
      tarjeta: new FormControl('no'),
      boletos: new FormControl(1),
    });
  }
  ProcesarCompra(): void {
    this.nombre = this.formulario.value.nombre;
    this.compradores = Number(this.formulario.value.compradores);
    this.boletos = Number(this.formulario.value.boletos);
    this.tarjeta = this.formulario.value.tarjeta;

    this.total = this.boletos * this.precio;
    this.descuento = 0;
    this.mensaje = '';

    if (this.compradores <= 0) {
      this.mensaje = 'Cantidad de compradores incorrecta';
    } else if (this.boletos <= 0) {
      this.mensaje = 'Cantidad de boletos incorrecta';
    } else if (this.boletos > this.compradores * 7) {
      this.mensaje = 'Solo puedes comprar 7 boletos por persona';
    } else {
      if (this.boletos > 5) {
        this.descuento = 0.15;
      } else if (this.boletos >= 3) {
        this.descuento = 0.1;
      } else {
        this.descuento = 0;
      }
      this.total = this.total - this.total * this.descuento;

      if (this.tarjeta == 'si') {
        this.total = this.total - this.total * 0.1;
      }
      //Todo este bloque es nuevo, solamente para recuperar las ventas de cinepolis
      this.ValorPagar = this.total;

      let ventas = JSON.parse(localStorage.getItem('ventasCinepolis') || '[]');

      ventas.push({
        nombre: this.nombre,
        compradores: this.compradores,
        boletos: this.boletos,
        tarjeta: this.tarjeta,
        total: this.ValorPagar,
      });

      localStorage.setItem('ventasCinepolis', JSON.stringify(ventas));
    }
    //Y aqui esta el LocalStorage
  }

  salir(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(1),
      tarjeta: new FormControl('no'),
      boletos: new FormControl(1),
    });

    this.nombre = '';
    this.compradores = 0;
    this.boletos = 0;
    this.tarjeta = '';
    this.total = 0;
    this.descuento = 0;
    this.ValorPagar = 0;
    this.mensaje = '';
  }
}
