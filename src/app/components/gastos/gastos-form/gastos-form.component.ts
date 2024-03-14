import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { GastosModel } from '../../../models/GastosModel';
import { GastosService } from '../../../services/gastos.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CategoriasService } from '../../../services/categorias.service';
import { ClasesService } from '../../../services/clases.service';
import { CategoriasModel } from '../../../models/CategoriasModel';
import { ClasesModel } from '../../../models/ClasesModel';

interface ClaseInterface {
  valorReal?: String;
  valorVisto?: String;
}

interface CategoriaInterface {
  valorReal?: String;
  valorVisto?: String;
}

@Component({
  selector: 'app-gastos-form',
  standalone: true,
  imports: [MatFormField, MatFormFieldModule, MatSelectModule,MatInputModule,FormsModule],
  templateUrl: './gastos-form.component.html',
  styleUrl: './gastos-form.component.css'
})


export class GastosFormComponent {
  claseSeleccionada: String = "";
  categoriaSeleccionada: String = "";

  selectClases: ClaseInterface[] = [
    {valorReal: '', valorVisto: 'Ninguna'},
  ];

  selectCategorias: CategoriaInterface[] = [
    {valorReal: '', valorVisto: 'Ninguna'},
  ];

  arregloCategorias: CategoriasModel[] = [];
  arregloClases: ClasesModel[] = [];

  arregloGastos:GastosModel[]= [];

  Gasto:GastosModel = {
    descripcion: "",
    estudiante: "",
    cantidad: 0
  };

  ngOnInit() {
    this.asignarIdEstudiante();
    this.traerClase();
    this.traerCategorias();
  }
  traerCategorias() {
    this.servicioCategoria.obtenerCategoriasDelEstudiante(this.Gasto.estudiante).subscribe(data => {
      this.arregloCategorias = data;
      console.log(this.arregloCategorias);
      this.llenarSelectCategoria();
    }, error => {
      console.log("Error al traer categorias = " + error);
    });
  }

  llenarSelectCategoria() {
    this.arregloCategorias.forEach(categoria => {
      this.selectCategorias.push({valorReal: categoria._id, valorVisto: categoria.nombre})
    });
  }
  traerClase() {
    this.servicioClase.obtenerClasesDelEstudiante(this.Gasto.estudiante).subscribe(data => {
      this.arregloClases = data;
      console.log(this.arregloClases);
      this.llenarSelectClases();
    }, error => {
      console.log("Error al traer Clases = " + error);
    });
  }
  llenarSelectClases() {
    this.arregloClases.forEach(clase => {
      this.selectClases.push({valorReal: clase.id, valorVisto: clase.nombre})
    });
  }
;


  idGasto:String = "";
  esActualizacion:boolean = false;
  tituloFormulario:String = "Crear Gasto";

  constructor(private servicioEstudiante: EstudianteService,
              private servicioGasto: GastosService,
              private servicioCategoria: CategoriasService,
              private servicioClase: ClasesService,
              private toastr: ToastrService,
              private router: Router,
              private aRoute: ActivatedRoute){
    if (this.aRoute.snapshot.paramMap.get('descripcion')) {
      this.esActualizacion = true;
      this.Gasto.descripcion = String (this.aRoute.snapshot.paramMap.get('descripcion'));
      this.Gasto.fecha = String (this.aRoute.snapshot.paramMap.get('fecha'));
      this.Gasto.cantidad = Number (this.aRoute.snapshot.paramMap.get('cantidad'));
      this.idGasto = String (this.aRoute.snapshot.paramMap.get('_id'));

      this.tituloFormulario = "Actualizar Gasto";
    }
  };

  enviarFormulario():void {
    console.log(this.Gasto);
    if (this.esActualizacion) {
      this.actualizarGasto();
    } else {
      this.guardarGasto();
    }
  }

  guardarGasto() {
      this.servicioEstudiante.getIdEstudiante().subscribe(id => {
        if (id) {
          this.Gasto.estudiante = id;
        }
      });
      this.Gasto.categoria = this.categoriaSeleccionada;
      this.Gasto.clase = this.claseSeleccionada;

      this.servicioGasto.guardarGasto(this.Gasto).subscribe(data => {
        this.toastr.success(`Se ha guardado con exito el gasto, ${data.descripcion} .`,"Exito!");
        this.router.navigate(['/gastos']);
      }, error => {
        this.toastr.error("Procura llenar todos los campos", "No se ha podido guardar el gasto");
        console.log("Error = " + error);
      });
    }

  actualizarGasto() {
    this.Gasto._id = String(this.idGasto);
    this.asignarIdEstudiante();
    this.servicioGasto.acualizarGasto(this.Gasto._id, this.Gasto).subscribe(data => {
      this.toastr.success(`Se ha actualizado con exito el gasto, ${this.Gasto.descripcion} .`,"Exito!");
      this.router.navigate(['/gastos']);
    }, error => {
      this.toastr.error("Procura llenar correctamente todos los campos", "No se ha podido actualizar el gasto");
      console.log("Error = " + error);
    });
  }
  asignarIdEstudiante() {
    this.servicioEstudiante.getIdEstudiante().subscribe(id => {
      if (id) {
        this.Gasto.estudiante = id;
      }
    });
  }

}



