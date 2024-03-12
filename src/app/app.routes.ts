import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { CategoriasControlComponent } from './views/categorias/categorias-control/categorias-control.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '#',
    redirectTo: '/login',
  },
  {
    path: 'categorias',
    component: CategoriasControlComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent
  }
];
