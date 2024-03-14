import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { InstitucionesFormComponent } from '../../../components/instituciones/instituciones-form/instituciones-form.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-instituciones-creation',
  standalone: true,
  imports: [NavbarComponent, InstitucionesFormComponent, FooterComponent],
  templateUrl: './instituciones-creation.component.html',
  styleUrl: './instituciones-creation.component.css'
})
export class InstitucionesCreationComponent {

}
