import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EstudiantesModel } from '../../models/EstudiantesModel';
import { EstudianteService } from '../../services/estudiante.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { desencriptar, encriptar } from '../../util/util-encrypt';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatSelectModule,MatInputModule ,MatFormFieldModule,MatIconModule,MatButtonModule, RouterLink, RouterOutlet, FormsModule,HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  hide = true;
  contrasenaEncriptada: string = '';

  constructor(private servicioEstudiante: EstudianteService,
              private toastr: ToastrService,
              private router: Router) { }

  Estudiante: EstudiantesModel = {
    nombre: "",
    apellido: "",
    edad: 0,
    presupuesto: 0,
    usuario: "",
    contrasena: ""
  }

  verificarUsuario(): void {
    this.servicioEstudiante.getEstudiantePorUsuario(this.Estudiante.usuario).subscribe(data => {
      console.log(data);
      this.Estudiante.nombre = data.nombre;
      this.contrasenaEncriptada =String(desencriptar(data.contrasena.toString()));
      console.log("Päss desemprictado " + this.contrasenaEncriptada);
      console.log("data desemprictado " + this.Estudiante.contrasena);
      if (this.lasContrasenasCoinciden(this.contrasenaEncriptada)) {
        this.toastr.success(`Es un placer tenerte por aqui, ${data.nombre} .`,"Bienvenido!");
        // this.router.navigate(['/home']);
      }else{
        this.toastr.error("El usuario o la contraseña no coinciden", "Error");
      }
    }, error =>{
      this.toastr.error("Procura llenar todos los campos", "No se ha guardado");
      console.log(error);
    });
  }
  lasContrasenasCoinciden(contrasena: any) {
    if (this.contrasenaEncriptada == contrasena) {
      return true
    }
    return false;
  }

}
