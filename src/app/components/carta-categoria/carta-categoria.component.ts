import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { CategoriasModel } from '../../models/CategoriasModel';
import { GastosModel } from '../../models/GastosModel';

@Component({
  selector: 'app-carta-categoria',
  standalone: true,
  imports: [],
  templateUrl: './carta-categoria.component.html',
  styleUrl: './carta-categoria.component.css'
})
export class CartaCategoriaComponent implements OnChanges{
  
  @Input() Categoria: CategoriasModel = {
    nombre: "",
    descripcion: "",
    estudiante: ""
  };
  @Input() periodo: String = "";
  @Input() gastosDelPeriodo: GastosModel[] = [];

  porcentaje: Number = 0;
  sumatoriaGastos: Number = 0;
  
  constructor() {
      // this.viewContainerRef.createEmbeddedView(templateRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['periodo']) {
      console.log("x");
      // this.viewContainerRef.clear();
      // this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
  
}
