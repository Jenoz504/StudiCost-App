import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable, catchError, map, of } from 'rxjs';
import { ClasesModel } from '../../../models/ClasesModel';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ClasesService } from '../../../services/clases.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { PeriodoService } from '../../../services/periodo.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-clases-view',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule, MatIconModule,RouterLink,MatButton],
  templateUrl: './clases-view.component.html',
  styleUrl: './clases-view.component.css'
})
export class ClasesViewComponent {


  constructor(private servicioEstudiante: EstudianteService,
    private servicioPeriodos: PeriodoService,
    private servicioClases: ClasesService,
    private toastr: ToastrService
    ){};

  private idEstudiante:String = "";
  Clases: ClasesModel[] = [
  ];

  displayedColumns: string[] = ['nombre', 'periodo','costoclase','nota','opciones'];
  dataSource = new MatTableDataSource<ClasesModel>(this.Clases);

  @ViewChild(MatPaginator) paginator?:MatPaginator;

  ngOnInit(){
    this.TraerClases();
    if (this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }

  TraerClases() {
    this.asignarIdEstudiante();
    this.servicioClases.obtenerClasesDelEstudiante(this.idEstudiante).subscribe(data => {
      this.Clases = data;
      this.dataSource.data = this.Clases;
      this.displayedColumns =  ['nombre', 'periodo','costoclase','nota','opciones'];
      console.log(data);
    })
  }

  asignarIdEstudiante() {
    this.servicioEstudiante.getIdEstudiante().subscribe(id => {
      if (id) {
        this.idEstudiante = id.toString();
      }
    })
  };


traerNombrePeriodo(idPeriodo: string): Observable<string> {
  if (!idPeriodo) {
    return of("Ninguna");
  }

  return this.servicioPeriodos.obtenerPeriodoPorId(idPeriodo).pipe(
    map(data => {
      if (data && data.nombre) {
        return data.nombre.toString(); // Accede al atributo nombre y conviértelo a String
      }
      return "Ninguna";
    }),
    catchError(error => {
      console.log(error);
      return of("Ninguna");
    })
  );
}
}
