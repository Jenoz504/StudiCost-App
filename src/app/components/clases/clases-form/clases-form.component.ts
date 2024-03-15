import { Component, OnInit} from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { ClasesService } from '../../../services/clases.service';
import { PeriodoService } from '../../../services/periodo.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasesModel } from '../../../models/ClasesModel';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PeriodosModel } from '../../../models/PeriodosModel';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

interface PeriodosInterface {
  valorReal?: String;
  valorVisto?: String;
}

@Component({
  selector: 'app-clases-form',
  standalone: true,
  imports: [MatFormField, MatFormFieldModule, MatSelectModule,MatInputModule,FormsModule],
  templateUrl: './clases-form.component.html',
  styleUrl: './clases-form.component.css'
})
export class ClasesFormComponent {
  periodoSeleccionado: String = "";

  selectPeriodos: PeriodosInterface[] = [
    {valorReal: '', valorVisto: 'Ninguna'},
  ];

  arregloPeriodos: PeriodosModel[] = [];

  Clase:ClasesModel = {
    nombre: "",
    estudiante: "",
    periodo: "",
    costoclase: 0,
    nota: 0
  };
  idClase:String = "";
  esActualizacion:boolean = false;
  tituloFormulario:String = "Crear Clase";

  constructor(private servicioEstudiante: EstudianteService,
              private servicioPeriodos: PeriodoService,
              private servicioClase: ClasesService,
              private toastr: ToastrService,
              private router: Router,
              private aRoute: ActivatedRoute){
    if (this.aRoute.snapshot.paramMap.get('nombre')) {
      this.esActualizacion = true;
      this.Clase.nombre = String (this.aRoute.snapshot.paramMap.get('nombre'));
      this.idClase = String (this.aRoute.snapshot.paramMap.get('_id'));
      this.Clase.nota = Number (this.aRoute.snapshot.paramMap.get('nota'));
      this.Clase.periodo = String(this.aRoute.snapshot.paramMap.get('periodo'));
      this.Clase.costoclase = Number (this.aRoute.snapshot.paramMap.get('costoclase'));
      this.tituloFormulario = "Actualizar Clase";
      this.periodoSeleccionado = String(this.aRoute.snapshot.paramMap.get('periodo'));
    }
  };

  ngOnInit() {
    this.asignarIdEstudiante();
    this.traerPeriodos();
  }
  asignarIdEstudiante() {
    this.servicioEstudiante.getIdEstudiante().subscribe(id => {
      if (id) {
        this.Clase.estudiante = id;
      }
    });
  }

  traerPeriodos() {
    this.servicioPeriodos.obtenerPeriodosDelEstudiante(this.Clase.estudiante).subscribe(data => {
      this.arregloPeriodos = data;
      console.log(this.arregloPeriodos);
      this.llenarSelectPeriodo();
    }, error => {
      console.log("Error al traer Periodos = " + error);
    });
  }

  llenarSelectPeriodo() {
    this.arregloPeriodos.forEach(periodo => {
      this.selectPeriodos.push({valorReal: periodo._id, valorVisto: periodo.nombre})
    });
  }

  enviarFormulario():void {
    console.log(this.Clase);
    if (this.esActualizacion) {
      this.actualizarClase();
    } else {
      this.guardarClase();
    }
  }

  guardarClase() {
      this.servicioEstudiante.getIdEstudiante().subscribe(id => {
        if (id) {
          this.Clase.estudiante = id;
        }
      });
      this.Clase.periodo = this.periodoSeleccionado;
      console.log("Clase a guardar == "+  this.Clase.costoclase);
      this.servicioClase.guardarClase(this.Clase).subscribe(data => {
        this.toastr.success(`Se ha guardado con exito la Clase, ${data.nombre} .`,"Exito!");
        this.router.navigate(['/clases']);
      }, error => {
        this.toastr.error("Procura llenar todos los campos", "No se ha podido guardar la Clase");
        console.log("Error = " + error);
      });
    }

    actualizarClase() {
      this.Clase._id = this.idClase;
      this.servicioEstudiante.getIdEstudiante().subscribe(id => {
        if (id) {
          this.Clase.estudiante = id;
        }
      });
      this.Clase.periodo = this.periodoSeleccionado;
      this.servicioClase.acualizarClase(this.Clase._id, this.Clase).subscribe(data => {
        this.toastr.success(`Se ha actualizado con exito la Clase, ${this.Clase.nombre} .`,"Exito!");
        this.router.navigate(['/clases']);
        console.log(data);
      }, error => {
        this.toastr.error("Procura llenar correctamente todos los campos", "No se ha podido actualizar la Clase");
        console.log("Error = " + error);
      });
  }

}
