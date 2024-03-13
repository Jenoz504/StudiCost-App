import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CategoriasModel } from '../../../models/CategoriasModel';

@Component({
  selector: 'app-categorias-view',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule, MatIconModule],
  templateUrl: './categorias-view.component.html',
  styleUrl: './categorias-view.component.css'
})

export class CategoriasViewComponent {
  displayedColumns: string[] = ['nombre', 'descripcion', 'opciones'];
  dataSource = new MatTableDataSource<CategoriasModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator?:MatPaginator;

  ngAfterViewInit() {
      if (this.paginator){
        this.dataSource.paginator = this.paginator;
      }
    }
}
// export interface PeriodicElement {
//   nombre: string;
//   position: number;
//   descripcion: number;
//   opciones: string;
// }

const ELEMENT_DATA: CategoriasModel[] = [

{nombre: "Transporte", descripcion:"Cualquier gasto relacionado con el transporte", estudiante:"65f086859b2a6e906ae09448"},
{nombre: "Transporte", descripcion:"Cualquier gasto relacionado con el transporte", estudiante:"65f086859b2a6e906ae09448"},
{nombre: "Transporte", descripcion:"Cualquier gasto relacionado con el transporte", estudiante:"65f086859b2a6e906ae09448"},
{nombre: "Transporte", descripcion:"Cualquier gasto relacionado con el transporte", estudiante:"65f086859b2a6e906ae09448"},
{nombre: "Transporte", descripcion:"Cualquier gasto relacionado con el transporte", estudiante:"65f086859b2a6e906ae09448"},
{nombre: "Transporte", descripcion:"Cualquier gasto relacionado con el transporte", estudiante:"65f086859b2a6e906ae09448"}
];
