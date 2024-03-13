import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { CategoriasControlComponent } from './views/categorias/categorias-control/categorias-control.component';
import { CategoriasCreationComponent } from './views/categorias/categorias-creation/categorias-creation.component';
import { PeriodosControlComponent } from './views/periodos/periodos-control/periodos-control.component';
import { PeriodosCreationComponent } from './views/periodos/periodos-creation/periodos-creation.component';

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
    path: 'periodos',
    component: PeriodosControlComponent,
  },
  {
    path: 'formularioPeriodo',
    component: PeriodosCreationComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent
  }
];
