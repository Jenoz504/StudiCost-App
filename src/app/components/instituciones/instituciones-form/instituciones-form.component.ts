import { Component, Input } from '@angular/core';
import { CategoriasModel } from '../../../models/CategoriasModel';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../../services/estudiante.service';
import { CategoriasService } from '../../../services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitucionesModel } from '../../../models/InstitucionesModel';
import { InstitucionesService } from '../../../services/instituciones.service';

@Component({
  selector: 'app-instituciones-form',
  standalone: true,
  imports: [MatFormField, MatInputModule,FormsModule],
  templateUrl: './instituciones-form.component.html',
  styleUrl: './instituciones-form.component.css'
})
export class InstitucionesFormComponent {
  Instituciones:InstitucionesModel = {nombre: "",
  direccion: "",
  estudiante: ""};
  idInstituciones:String = "";
  esActualizacion:boolean = false;
  tituloFormulario:String = "Crear Instituciones";

  constructor(private servicioEstudiante: EstudianteService,
              private servicioInstituciones: InstitucionesService,
              private toastr: ToastrService,
              private router: Router,
              private aRoute: ActivatedRoute){
    if (this.aRoute.snapshot.paramMap.get('nombre')) {
      this.esActualizacion = true;
      this.Instituciones.direccion = String (this.aRoute.snapshot.paramMap.get('direccion'));
      this.Instituciones.nombre = String (this.aRoute.snapshot.paramMap.get('nombre'));
      this.idInstituciones = String (this.aRoute.snapshot.paramMap.get('_id'));

      this.tituloFormulario = "Actualizar Instituciones";
    }
  };

  enviarFormulario():void {
    console.log(this.Instituciones);
    if (this.esActualizacion) {
      this.actualizarInstituciones();
    } else {
      this.guardarInstituciones();
    }
  }

  guardarInstituciones() {
      this.servicioEstudiante.getIdEstudiante().subscribe(id => {
        if (id) {
          this.Instituciones.estudiante = id;
        }
      });

      this.servicioInstituciones.guardarInstituciones(this.Instituciones).subscribe(data => {
        this.toastr.success(`Se ha guardado con exito la Instituciones, ${data.nombre} .`,"Exito!");
        this.router.navigate(['/Instituciones']);
      }, error => {
        this.toastr.error("Procura llenar todos los campos", "No se ha podido guardar la Instituciones");
        console.log("Error = " + error);
      });
    }

    actualizarInstituciones() {
      this.Instituciones._id = String(this.idInstituciones);
      this.servicioEstudiante.getIdEstudiante().subscribe(id => {
        if (id) {
          this.Instituciones.estudiante = id;
        }
      });

      this.servicioInstituciones.acualizarInstituciones(this.Instituciones._id, this.Instituciones).subscribe(data => {
        this.toastr.success(`Se ha actualizado con exito la Instituciones, ${this.Instituciones.nombre} .`,"Exito!");
        this.router.navigate(['/Instituciones']);
      }, error => {
        this.toastr.error("Procura llenar correctamente todos los campos", "No se ha podido actualizar la categoria");
        console.log("Error = " + error);
      });
  }
}
