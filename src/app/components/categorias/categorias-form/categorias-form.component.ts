import { Component, Input } from '@angular/core';
import { CategoriasModel } from '../../../models/CategoriasModel';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../../services/estudiante.service';
import { CategoriasService } from '../../../services/categorias.service';
import { ToastrService } from 'ngx-toastr';

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
  @Input() tituloFormulario:String = "Crear Categoria";

  constructor(private servicioEstudiante: EstudianteService,
              private servicioCategoria: CategoriasService,
              private toastr: ToastrService){};

  enviarFormulario():void {
    console.log(this.categoria);
    if (this.esActualizacion) {
      this.actualizarCategoria();
    } else {
      this.guardarCategoria();
    }
  }

  guardarCategoria() {
      this.servicioEstudiante.getIdEstudiante().subscribe(id => {
        if (id) {
          this.categoria.estudiante = id;
        }
      });

      this.servicioCategoria.guardarCategoria(this.categoria).subscribe(data => {
        this.toastr.success(`Se ha guardado con exito la categoria, ${data.nombre} .`,"Exito!");
      }, error => {
        this.toastr.error("Procura llenar todos los campos", "No se ha podido guardar la categoria");
        console.log("Error = " + error);
      });
    }

    actualizarCategoria() {
      this.categoria._id = this.servicioEstudiante.getIdEstudiante().toString();
      this.servicioCategoria.acualizarCategoria(this.categoria._id,this.categoria).subscribe(data => {
        this.toastr.success(`Se ha actualizado con exito la categoria, ${data.nombre} .`,"Exito!");
      }, error => {
        this.toastr.error("Procura llenar correctamente todos los campos", "No se ha podido actualizar la categoria");
        console.log("Error = " + error);
      });
  }

}
