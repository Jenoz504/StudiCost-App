import { Component } from '@angular/core';
import { RegistroFormComponent } from '../../components/registro-form/registro-form.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RegistroFormComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

}
