import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';
import { CategoriasControlComponent } from './views/categorias/categorias-control/categorias-control.component';
import { CategoriasCreationComponent } from './views/categorias/categorias-creation/categorias-creation.component';
import { PeriodosControlComponent } from './views/periodos/periodos-control/periodos-control.component';
import { PeriodosCreationComponent } from './views/periodos/periodos-creation/periodos-creation.component';
import { InstitucionesControlComponent } from './views/instituciones/instituciones-control/instituciones-control.component';
import { InstitucionesCreationComponent } from './views/instituciones/instituciones-creation/instituciones-creation.component';
import { GastosControlComponent } from './views/gastos/gastos-control/gastos-control.component';
import { GastosCreationComponent } from './views/gastos/gastos-creation/gastos-creation.component';
import { ClasesControlComponent } from './views/clases/clases-control/clases-control.component';
import { ClasesCreationComponent } from './views/clases/clases-creation/clases-creation.component';

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
    path: 'formularioperiodo',
    component: PeriodosCreationComponent,
  },
  {
    path: 'formulariogasto',
    component: GastosCreationComponent,
  },
  {
    path: 'gastos',
    component: GastosControlComponent,
  },
  {
    path: 'clases',
    component: ClasesControlComponent
  },
  {
    path: 'formularioclases',
    component: ClasesCreationComponent,
  },
  {
    path: 'instituciones',
    component: InstitucionesControlComponent,
  },
  {
    path: 'formularioinstituciones',
    component: InstitucionesCreationComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent
  }
];
