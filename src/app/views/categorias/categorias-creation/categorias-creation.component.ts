import { Component } from '@angular/core';
import { CategoriasFormComponent } from '../../../components/categorias/categorias-form/categorias-form.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-categorias-creation',
  standalone: true,
  imports: [CategoriasFormComponent, NavbarComponent],
  templateUrl: './categorias-creation.component.html',
  styleUrl: './categorias-creation.component.css'
})
export class CategoriasCreationComponent {

}
