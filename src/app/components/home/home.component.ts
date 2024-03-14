import { Component } from '@angular/core';
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

interface PeriodosInterface {
  valorReal?: String;
  valorVisto?: String;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatProgressBarModule, NavbarComponent, FooterComponent,MatFormField, MatFormFieldModule, MatSelectModule,MatInputModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  porcentajedePresupuesto: number = 0;
  periodoSeleccionado: String = "";
  idEstudiante: String = "";
  selectPeriodos: PeriodosInterface[] = [
    {valorReal: '', valorVisto: 'Ninguna'},
  ];
  arregloPeriodos:PeriodosModel[] = [];

  constructor(private servicioEstudiante: EstudianteService,
    private servicioPeriodos: PeriodoService,
    private servicioClase: ClasesService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.asignarIdEstudiante();
    this.traerPeriodos();
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
}
