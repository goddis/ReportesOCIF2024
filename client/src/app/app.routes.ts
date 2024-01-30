import { GrupoSeguridad } from './interfaces/GrupoSeguridad';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/inicio/inicio.component').then(c => c.InicioComponent)
    },
    {
        path: 'administracion/areas',
        loadComponent: () => import('./components/areas/areas.component').then(c => c.AreasComponent)
    },
    {
        path: 'seguridad/usuarios',
        loadComponent: () => import('./components/usuarios/usuarios.component').then(c => c.UsuariosComponent)
    },
    {
        path: 'seguridad/grupoSeguridad',
        loadComponent: () => import('./components/grupo-seguridad/grupo-seguridad.component').then(c => c.GrupoSeguridadComponent)
    },
    {
        path: 'seguridad/permisos',
        loadComponent: () => import('./components/permisos/permisos.component').then(c => c.PermisosComponent)
    },
    {
        path: 'parametrizacion/formatos',
        loadComponent: () => import('./components/formatos/formatos.component').then(c => c.FormatosComponent)
    },
    {
        path: 'parametrizacion/nodos',
        loadComponent: () => import('./components/nodos/nodos.component').then(c => c.NodosComponent)
    },
    {
        path: 'carga/cargarFormatos',
        loadComponent: () => import('./components/cargar-formatos/cargar-formatos.component').then(c => c.CargarFormatosComponent)
    },
    {
        path: 'informes',
        loadComponent: () => import('./components/informes/informes.component').then(c => c.InformesComponent)
    },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
