import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { InstitucionesModel } from '../../../models/InstitucionesModel';
import { EstudianteService } from '../../../services/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesService } from '../../../services/instituciones.service';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-instituciones-view',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule, MatIconModule,RouterLink,MatButton],
  templateUrl: './instituciones-view.component.html',
  styleUrl: './instituciones-view.component.css'
})
export class InstitucionesViewComponent {
  constructor(private servicioEstudiante: EstudianteService,
    private servicioInstituciones: InstitucionesService,
    private toastr: ToastrService
    ){};

  private idEstudiante:String = "";
  Instituciones: InstitucionesModel[] = [
  ];

  displayedColumns: string[] = ['nombre', 'direccion', 'opciones'];
  dataSource = new MatTableDataSource<InstitucionesModel>(this.Instituciones);

  @ViewChild(MatPaginator) paginator?:MatPaginator;


  TraerInstituciones() {
    this.asignarIdEstudiante();
    this.servicioInstituciones.obtenerInstitucionesDelEstudiante(this.idEstudiante).subscribe(data => {
      this.Instituciones = data;
      this.dataSource.data = this.Instituciones;
      this.displayedColumns = ['nombre', 'direccion', 'opciones'];
      console.log(this.Instituciones);
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
    this.TraerInstituciones();
    if (this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
}
