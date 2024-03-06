import { Component } from '@angular/core';
import { RegistroFormComponent } from '../../components/registro-form/registro-form.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RegistroFormComponent,FooterComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

}
