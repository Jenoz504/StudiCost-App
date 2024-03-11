import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EstudiantesModel } from '../../models/EstudiantesModel';
import { EstudianteService } from '../../services/estudiante.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { encriptar } from '../../util/util-encrypt';

@Component({
  selector: 'app-registro-form',
  standalone: true,
  imports: [MatSelectModule,MatInputModule ,MatFormFieldModule,MatIconModule,MatButtonModule, HttpClientModule,RouterLink, AsyncPipe, FormsModule],
  templateUrl: './registro-form.component.html',
  styleUrl: './registro-form.component.css'
})

export class RegistroFormComponent {
  hide = true;

  constructor(private servicioEstudiante: EstudianteService,
    private toastr: ToastrService) {
  }

  Estudiante: EstudiantesModel = {
    nombre: "",
    apellido: "",
    edad: 0,
    presupuesto: 0,
    usuario: "",
    contrasena: ""
  }

  Estudiantes: EstudiantesModel[]=[]

  guardarUsuario(): void {
    this.Estudiante.contrasena = encriptar(JSON.stringify(this.Estudiante.contrasena));
    this.toastr.success("Ya puedes iniciar sesión.", JSON.stringify(this.Estudiante.contrasena));
    console.log(this.Estudiante);
    this.servicioEstudiante.guardarEstudiante(this.Estudiante).subscribe(data=> {
      console.log(data);
      // this.router.navigate(['/login']);
      this.toastr.success("Ya puedes iniciar sesión.","¡Estudiante registrado con éxito!");
    }, error => {
      this.toastr.error("Procura llenar todos los campos", "No se ha guardado");
      console.log(error);
    });
  }
}
