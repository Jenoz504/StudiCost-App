import { Component, ViewChild, OnInit} from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { GastosService } from '../../../services/gastos.service';
import { ToastrService } from 'ngx-toastr';
import { GastosModel } from '../../../models/GastosModel';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { CategoriasService } from '../../../services/categorias.service';
import { ClasesService } from '../../../services/clases.service';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-gastos-view',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule, MatIconModule,RouterLink,MatButton],
  templateUrl: './gastos-view.component.html',
  styleUrl: './gastos-view.component.css'
})
export class GastosViewComponent {



  constructor(private servicioEstudiante: EstudianteService,
    private servicioGastos: GastosService,
    private servicioCategorias: CategoriasService,
    private servicioClases: ClasesService,
    private toastr: ToastrService
    ){};

  private idEstudiante:String = "";
  Gastos: GastosModel[] = [
  ];

  displayedColumns: string[] = ['descripcion', 'categoria','fecha','clase','opciones'];
  dataSource = new MatTableDataSource<GastosModel>(this.Gastos);

  @ViewChild(MatPaginator) paginator?:MatPaginator;

  ngOnInit(){
    this.TraerGastos();
    if (this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }

  TraerGastos() {
    this.asignarIdEstudiante();
    this.servicioGastos.obtenerGastosDelEstudiante(this.idEstudiante).subscribe(data => {
      this.Gastos = data;
      this.dataSource.data = this.Gastos;
      this.displayedColumns =  ['descripcion', 'categoria','fecha','clase','opciones'];
      // console.log(this.Gastos);
    })
  }
  eliminar(gasto:GastosModel){
    this.servicioGastos.eliminarGasto(String(gasto._id));
    this.toastr.success("Gasto eliminado!");
  }
  
  asignarIdEstudiante() {
    this.servicioEstudiante.getIdEstudiante().subscribe(id => {
      if (id) {
        this.idEstudiante = id.toString();
      }
    })
  };

  // Las siguientes funciones sirven para trar el nombre dde los id
trareNombreClase(idClase: string) {
  // this.servicioClases.obtenerClasePorId(idClase).subscribe(data => {
  //   let nombreClase: String = "Ninguna";
  //   if (data.nombre != "") {
  //     nombreClase = String(data.nombre)
  //   }
  // }, error => {
  //   console.log(error);
  // });
  // return nombreClase;
}

traerNombreCategoria(idCategoria: string): Observable<string> {
  if (!idCategoria) {
    return of("Ninguna");
  }

  return this.servicioCategorias.obtenerCategoriaPorId(idCategoria).pipe(
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
