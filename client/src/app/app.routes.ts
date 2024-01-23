import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/inicio/inicio.component').then(c => c.InicioComponent)
    },
    {
        path: 'usuarios',
        loadComponent: () => import('./components/usuarios/usuarios.component').then(c => c.UsuariosComponent)
    },
    {
        path: 'areas',
        loadComponent: () => import('./components/areas/areas.component').then(c => c.AreasComponent)
    },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
