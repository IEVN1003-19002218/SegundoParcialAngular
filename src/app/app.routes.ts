import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Formulario',
    children: [
      {
        path: 'distancia',
        loadComponent: () => import('./Formulario/distancia/distancia').then((c) => c.Distancia),
      },
    ],
  },
  {
    path: 'Formulario',
    children: [
      {
        path: 'zodiaco',
        loadComponent: () => import('./Formulario/zodiaco/zodiaco').then((c) => c.Zodiaco),
      },
    ],
  },
  {
    path: 'escuela',
    children: [
      {
        path: 'lista-escuela',
        loadComponent: () =>
          import('./escuela/lista-escuela/lista-escuela').then((c) => c.ListaEscuela),
      },
      {
        path: 'cinepolis',
        loadComponent: () => import('./escuela/cinepolis/cinepolis').then((c) => c.Cinepolis),
      },
      {
        path: 'ventas',
        loadComponent: () => import('./escuela/ventas/ventas-cinepolis').then((c) => c.Ventas),
      },
    ],
  },

  {
    path: 'utl/alumnos/agregar',
    loadComponent: () => import('./utl/ABCAlumnos/agregar/agregar').then((c) => c.Agregar),
  },

  {
    path: 'utl/alumnos',
    loadComponent: () => import('./utl/ABCAlumnos/alumnos/alumnos').then((c) => c.Alumnos),
  },
  {
    path: 'utl/alumnos/editar/:matricula',
    loadComponent: () => import('./utl/ABCAlumnos/editar/editar').then((c) => c.Editar),
  },
  {
    path: 'utl/alumnos/eliminar/:matricula',
    loadComponent: () => import('./utl/ABCAlumnos/eliminar/eliminar').then((c) => c.Eliminar),
  },

{
  path: 'utl/maestros',
  loadComponent: () =>
    import('./utl/ABCMaestros/maestros/maestros').then(c => c.Maestros)
},
{
  path: 'utl/maestros/agregar',
  loadComponent: () =>
    import('./utl/ABCMaestros/agregar/agregar').then(c => c.Agregar)
},
{
  path: 'utl/maestros/editar/:idmaestro',
  loadComponent: () =>
    import('./utl/ABCMaestros/editar/editar').then(c => c.Editar)
},
{
  path: 'utl/maestros/eliminar/:idmaestro',
  loadComponent: () =>
    import('./utl/ABCMaestros/eliminar/eliminar').then(c => c.Eliminar)
},


  { path: '', redirectTo: 'utl/alumnos', pathMatch: 'full' },
  { path: '**', redirectTo: 'utl/alumnos' },
];
