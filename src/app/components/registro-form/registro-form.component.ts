import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EstudiantesModel } from '../../models/EstudiantesModel';
import { EstudianteService } from '../../services/estudiante.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { desencriptar, encriptar } from '../../util/util-encrypt';
import *  as CryptoJs from 'crypto-js'


@Component({
  selector: 'app-registro-form',
  standalone: true,
  imports: [MatSelectModule,MatInputModule ,MatFormFieldModule,MatIconModule,MatButtonModule, HttpClientModule,RouterLink, AsyncPipe, FormsModule,RouterLink],
  templateUrl: './registro-form.component.html',
  styleUrl: './registro-form.component.css'
})

export class RegistroFormComponent {
  hide = true;
  contrasena2:string = '';
  constructor(private servicioEstudiante: EstudianteService,
    private toastr: ToastrService,
    private router: Router) {
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
    if (this.lasContrasenasCoinciden()) {
      // console.log(this.Estudiante.contrasena.toString());
      this.Estudiante.contrasena = encriptar(this.Estudiante.contrasena.toString());
      console.log(this.Estudiante);
      // console.log(desencriptar(this.Estudiante.contrasena.toString()));
      this.servicioEstudiante.guardarEstudiante(this.Estudiante).subscribe(data=> {
        console.log(data);
        this.router.navigate(['/login']);
        this.toastr.success("Ya puedes iniciar sesión.","¡Estudiante registrado con éxito!");
      }, error => {
        this.toastr.error("Procura llenar todos los campos", "No se ha guardado");
        console.log(error);
      });
    }else {
      this.toastr.error("Las contraseñas no coinciden", "No se ha guardado");
    }


  }
  lasContrasenasCoinciden():boolean {
    if (this.contrasena2 == this.Estudiante.contrasena) {
      return true;
    }
      return false;
    };
}
