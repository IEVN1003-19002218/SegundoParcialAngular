
import { Pipe, PipeTransform } from '@angular/core';
import { alumnosUTL } from './alumnosUTL';

@Pipe({
  name: 'alumnosUTL',
  standalone: true
})
export class AlumnoFilterPipe implements PipeTransform {

  transform(value: alumnosUTL[], args: string): alumnosUTL[] {
    let filter: string = args ? args.toLocaleLowerCase() : '';

    return value.filter((alumno: alumnosUTL) =>
      alumno.nombre.toLocaleLowerCase().indexOf(filter) !== -1
    );
  }
}
