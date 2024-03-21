import { Component, OnChanges } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { PeriodoService } from '../../services/periodo.service';
import { ClasesService } from '../../services/clases.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodosModel } from '../../models/PeriodosModel';
import { GastosService } from '../../services/gastos.service';
import { GastosModel } from '../../models/GastosModel';
import { EstudiantesModel } from '../../models/EstudiantesModel';
import { CartaCategoriaComponent } from '../carta-categoria/carta-categoria.component';
import { CategoriasModel } from '../../models/CategoriasModel';
import { CategoriasService } from '../../services/categorias.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
interface PeriodosInterface {
  valorReal?: String;
  valorVisto?: String;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatProgressBarModule, NavbarComponent, FooterComponent,MatFormField, MatFormFieldModule, MatSelectModule,MatInputModule,FormsModule, CartaCategoriaComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  sumatoriaGastos: Number = 0;
  presupuesto: Number = 0;
  porcentajedePresupuesto: number = 0;
  periodoSeleccionado: String = "";
  idEstudiante: String = "";
  selectPeriodos: PeriodosInterface[] = [
    {valorReal: '', valorVisto: 'Ninguna'},
  ];
  
  arregloPeriodos:PeriodosModel[] = [];
  periodosFiltrados :PeriodosModel[] = [];
  arregloGastos:GastosModel[] = [];
  gastosFiltrados:GastosModel[] = [];
  categorias:CategoriasModel[] = [];
  Periodo:PeriodosModel= {
    nombre: '',
    fechainicio: "",
    fechacierre: "",
    estudiante: "",
    presupuesto: 0 
  };

  Estudiante: EstudiantesModel = {
    nombre: "",
    apellido: "",
    edad: 0,
    presupuesto: 0,
    usuario: "",
    contrasena: ""
  }


  constructor(private servicioEstudiante: EstudianteService,
    private servicioPeriodos: PeriodoService,
    private servicioClase: ClasesService,
    private servicioGastos: GastosService,
    private servicioCategorias:CategoriasService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.asignarIdEstudiante();
    this.traerPeriodos();
    this.traerGastos();
    this.traerPersupuesto();
    this.traerCategorias();
  }
  traerCategorias() {
    this.servicioCategorias.obtenerCategoriasDelEstudiante(this.idEstudiante).subscribe(data => {
      this.categorias = data;
      console.log(data);
    })
    this.cdr.detectChanges();
  
  }
  traerPersupuesto() {
    this.servicioPeriodos.obtenerPeriodoPorId(this.periodoSeleccionado).subscribe(data=> {
      this.Estudiante = data;
      this.presupuesto = this.Estudiante.presupuesto;
      console.log(this.Estudiante);
    });
  }

  traerGastos() {
    this.servicioGastos.obtenerGastosDelEstudiante(this.idEstudiante).subscribe(data => {
      this.arregloGastos = data;
      console.log(this.arregloGastos);
    }, error => {
      console.log("Error al traer Gastos = " + error);
    });
  }
  asignarIdEstudiante() {
    this.servicioEstudiante.getIdEstudiante().subscribe(id => {
      if (id) {
        this.idEstudiante = id;
      }
    });
  }

  traerPeriodos() {
    this.servicioPeriodos.obtenerPeriodosDelEstudiante(this.idEstudiante).subscribe(data => {
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

  onCategoriaChange() {
    
    this.sumatoriaGastos = 0;
    if (this.periodoSeleccionado) {
      this.asignarPeriodoEscogido();
      this.filtrarObjetos();
      this.sumatoriaGastos = this.gastosFiltrados.reduce((total, objeto) => total + objeto.cantidad.valueOf(), 0);
      this.traerPersupuesto()
      this.porcentajedePresupuesto = Number(this.sumatoriaGastos)/ (Number(this.Estudiante.presupuesto))*100;
      this.traerCategorias();
    }else {

      this.porcentajedePresupuesto = 0;
    }
  }

  asignarPeriodoEscogido() {
    this.servicioPeriodos.obtenerPeriodoPorId(this.periodoSeleccionado).subscribe(data=>{
      this.Periodo = data;
    });
  }

  filtrarObjetos() {
    let fechaInicioPeriodo = new Date(this.Periodo.fechainicio.toString());
    let fechaFinPeriodo = new Date(this.Periodo.fechacierre.toString());
    this.gastosFiltrados = this.arregloGastos.filter(objeto => {
    let fechaObjeto = new Date(objeto.fecha.toString());
      return fechaObjeto >= fechaInicioPeriodo && fechaObjeto <= fechaFinPeriodo;
    }).map(objeto => {
      return { descripcion: objeto.descripcion, cantidad: objeto.cantidad, fecha: objeto.fecha, clase: objeto.clase, estudiante: objeto.estudiante};
    });
    
  }
}
