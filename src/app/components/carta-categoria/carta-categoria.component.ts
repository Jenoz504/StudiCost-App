import { Component, Input } from '@angular/core';
import { CategoriasModel } from '../../models/CategoriasModel';

@Component({
  selector: 'app-carta-categoria',
  standalone: true,
  imports: [],
  templateUrl: './carta-categoria.component.html',
  styleUrl: './carta-categoria.component.css'
})
export class CartaCategoriaComponent {

  @Input() Categoria: CategoriasModel = {
    nombre: "",
    descripcion: "",
    estudiante: ""
  };
  
}
