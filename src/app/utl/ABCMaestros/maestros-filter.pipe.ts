
import { Pipe, PipeTransform } from '@angular/core';
import { maestrosUTL } from './maestrosUTL';

@Pipe({
  name: 'maestrosUTL',
  standalone: true
})
export class MaestroFilterPipe implements PipeTransform {

  transform(value: maestrosUTL[], args: string): maestrosUTL[] {
    let filtro: string = args ? args.toLocaleLowerCase() : '';

    return value.filter((maestro: maestrosUTL) =>
      maestro.nombre.toLocaleLowerCase().indexOf(filtro) !== -1
    );
  }
}
