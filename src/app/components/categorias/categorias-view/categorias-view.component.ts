import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CategoriasModel } from '../../../models/CategoriasModel';
import { EstudianteService } from '../../../services/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../../../services/categorias.service';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-categorias-view',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule, MatIconModule,RouterLink,MatButton],
  templateUrl: './categorias-view.component.html',
  styleUrl: './categorias-view.component.css'
})

export class CategoriasViewComponent {
  constructor(private servicioEstudiante: EstudianteService,
    private servicioCategorias: CategoriasService,
    private toastr: ToastrService
    ){};

  private idEstudiante:String = "";
  categorias: CategoriasModel[] = [
  ];

  eliminar(Categoria: CategoriasModel) {
    this.servicioCategorias.eliminarCategoria(String (Categoria._id)).subscribe(data=>{
      this.toastr.success("Categoria eliminada!" , "Se ha eliminado la Categoria");
    });
  }
  displayedColumns: string[] = ['nombre', 'descripcion', 'opciones'];
  dataSource = new MatTableDataSource<CategoriasModel>(this.categorias);

  @ViewChild(MatPaginator) paginator?:MatPaginator;


  TraerCategorias() {
    this.asignarIdEstudiante();
    this.servicioCategorias.obtenerCategoriasDelEstudiante(this.idEstudiante).subscribe(data => {
      this.categorias = data;
      this.dataSource.data = this.categorias;
      this.displayedColumns = ['nombre', 'descripcion', 'opciones'];
      console.log(this.categorias);
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
    this.TraerCategorias();
    if (this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }

}



