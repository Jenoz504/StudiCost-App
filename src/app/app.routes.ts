import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { CategoriasControlComponent } from './views/categorias/categorias-control/categorias-control.component';
import { CategoriasCreationComponent } from './views/categorias/categorias-creation/categorias-creation.component';

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
    path: 'formulariocategoria',
    component: CategoriasCreationComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent
  }
];
