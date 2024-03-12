import { Component, Input } from '@angular/core';
import { CategoriasModel } from '../../../models/CategoriasModel';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias-form',
  standalone: true,
  imports: [MatFormField, MatInputModule,FormsModule],
  templateUrl: './categorias-form.component.html',
  styleUrl: './categorias-form.component.css'
})

export class CategoriasFormComponent {

  @Input() categoria:CategoriasModel = {nombre: "",
  descripcion: "",
  estudiante: ""};
  @Input() esActualizacion:boolean = false;


  enviarFormulario():void {
    console.log(this.categoria);
    if (this.esActualizacion) {
      this.actualizarCategoria();
    } else {
      this.guardarCategoria();
    }
  }

  guardarCategoria() {

  }

  actualizarCategoria() {

  }

}