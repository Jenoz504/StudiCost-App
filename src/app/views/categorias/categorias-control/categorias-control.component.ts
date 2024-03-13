import { Component } from '@angular/core';
import { CategoriasViewComponent } from '../../../components/categorias/categorias-view/categorias-view.component';
import { CategoriasCreationComponent } from '../categorias-creation/categorias-creation.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-categorias-control',
  standalone: true,
  imports: [CategoriasViewComponent, CategoriasCreationComponent,NavbarComponent, CategoriasViewComponent],
  templateUrl: './categorias-control.component.html',
  styleUrl: './categorias-control.component.css'
})
export class CategoriasControlComponent {

}
