import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { PeriodoService } from '../../../services/periodo.service';
import { ToastrService } from 'ngx-toastr';
import { PeriodosModel } from '../../../models/PeriodosModel';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-periodo-view',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule, MatIconModule,RouterLink,MatButton],
  templateUrl: './periodo-view.component.html',
  styleUrl: './periodo-view.component.css'
})
export class PeriodoViewComponent {
  constructor(private servicioEstudiante: EstudianteService,
    private servicioPeriodos: PeriodoService,
    private toastr: ToastrService
    ){};

  private idEstudiante:String = "";
  periodos: PeriodosModel[] = [
  ];

  displayedColumns: string[] = ['nombre','fechainicio', 'fechacierre', 'opciones'];
  dataSource = new MatTableDataSource<PeriodosModel>(this.periodos);

  @ViewChild(MatPaginator) paginator?:MatPaginator;


  TraerPeriodos() {
    this.asignarIdEstudiante();
    this.servicioPeriodos.obtenerPeriodosDelEstudiante(this.idEstudiante).subscribe(data => {
      this.periodos = data;
      console.log(this.periodos);
      this.dataSource.data = data;
      this.displayedColumns = ['nombre','fechainicio', 'fechacierre', 'opciones'];
      console.log(this.periodos);
    })
  }

  asignarIdEstudiante() {
    this.servicioEstudiante.getIdEstudiante().subscribe(id => {
      if (id) {
        this.idEstudiante = id.toString();
      }
    })
  };


  ngOnInit(){
    this.TraerPeriodos();
    if (this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
}
