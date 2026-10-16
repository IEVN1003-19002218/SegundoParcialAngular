
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { IAlumno } from '../alumno';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-lista-escuela',
  styleUrl: './lista-escuela.css',
  templateUrl: './lista-escuela.html',
})
export class ListaEscuela {
  formulario!: FormGroup
  indiceEdicion: number = -1;
  nuevoAlumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: '',
  }

  alumnos: IAlumno[] = [];

  ngOnInit(): void {

    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    })

    this.alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');

  }

  CargarAlumno(): void {
    this.nuevoAlumno.matricula = this.formulario.value.matricula
    this.nuevoAlumno.nombre = this.formulario.value.nombre
    this.nuevoAlumno.correo = this.formulario.value.correo
    this.nuevoAlumno.materia = this.formulario.value.materia
  }


AgregarAlumno(): void {

  this.CargarAlumno();

  if (this.nuevoAlumno.matricula === '' ||
    this.nuevoAlumno.nombre === '' ||
    this.nuevoAlumno.correo === '' ||
    this.nuevoAlumno.materia === ''
  ) {
    alert('Todos los datos son obligatorios');
    return;
  }

  if (this.indiceEdicion === -1) {

    this.alumnos.push({...this.nuevoAlumno});

  } else {

    this.alumnos[this.indiceEdicion] = {...this.nuevoAlumno};

    this.indiceEdicion = -1;

  }

  localStorage.setItem(
    'alumnos',
    JSON.stringify(this.alumnos)
  );

}




editarAlumno(index: number): void {

  this.nuevoAlumno = {
    ...this.alumnos[index]
  }

  const alumno = this.alumnos[index];

  this.formulario.patchValue({
    matricula: alumno.matricula,
    nombre: alumno.nombre,
    correo: alumno.correo,
    materia: alumno.materia
  });

  this.indiceEdicion = index;

}



    MostrarAlumnos(): void {

    this.alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');

  }

  EliminarAlumno(index: number): void{
    this.alumnos.splice(index, 1)
    localStorage.setItem('alumnos', JSON.stringify(this.alumnos))
  }

   limpiarCampos(): void {
    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    }
    this.formulario.patchValue({
      matricula: this.nuevoAlumno.matricula,
      nombre: this.nuevoAlumno.nombre,
      correo: this.nuevoAlumno.correo,
      materia: this.nuevoAlumno.materia
    })
    this.indiceEdicion = -1
  }
}


