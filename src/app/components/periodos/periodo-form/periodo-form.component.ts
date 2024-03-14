import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EstudianteService } from '../../../services/estudiante.service';
import { PeriodoService } from '../../../services/periodo.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodosModel } from '../../../models/PeriodosModel';


@Component({
  selector: 'app-periodo-form',
  standalone: true,
  imports: [MatFormField, MatInputModule,FormsModule],
  templateUrl: './periodo-form.component.html',
  styleUrl: './periodo-form.component.css'
})
export class PeriodoFormComponent {
  periodo:PeriodosModel = {
    fechainicio: "",
    fechacierre: "",
    institucion: "",
    estudiante: ""
  };

  idPeriodo:String = "";
  esActualizacion:boolean = false;
  tituloFormulario:String = "Crear Periodo";

  constructor(private servicioEstudiante: EstudianteService,
    private servicioPeriodo: PeriodoService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute){

      if (this.aRoute.snapshot.paramMap.get('_id')) {
        this.esActualizacion = true;
        this.periodo.fechainicio = String (this.aRoute.snapshot.paramMap.get('fechainicio'));
        this.periodo.fechacierre = String (this.aRoute.snapshot.paramMap.get('fechacierre'));
        this.idPeriodo = String (this.aRoute.snapshot.paramMap.get('_id'));

        this.tituloFormulario = "Actualizar Periodo";
    }
  }

  guardarPeriodo() {
    this.servicioEstudiante.getIdEstudiante().subscribe(id => {
      if (id) {
        this.periodo.estudiante = id;
      }
    });

    this.servicioPeriodo.guardarPeriodo(this.periodo).subscribe(data => {
      this.toastr.success(`Se ha guardado con exito el periodo, ${data.nombre} .`,"Exito!");
      this.router.navigate(['/periodos']);
    }, error => {
      this.toastr.error("Procura llenar todos los campos", "No se ha podido guardar el periodo");
      console.log("Error = " + error);
    });
  }

  enviarFormulario():void {
    console.log(this.periodo);
    if (this.esActualizacion) {
      this.actualizarperiodo();
    } else {
      this.guardarPeriodo();
    }
  }

  actualizarperiodo() {
    this.periodo._id = String (this.idPeriodo);
    this.servicioEstudiante.getIdEstudiante().subscribe(id => {
      if (id) {
        this.periodo.estudiante = id;
      }
    });

    this.servicioPeriodo.acualizarPeriodo(this.periodo._id, this.periodo).subscribe(data => {
      this.toastr.success(`Se ha actualizado con exito el periodo.`,"Exito!");
      this.router.navigate(['/periodos']);
    }, error => {
      this.toastr.error("Procura llenar correctamente todos los campos", "No se ha podido actualizar el periodo");
      console.log("Error = " + error);
    });
}

}
