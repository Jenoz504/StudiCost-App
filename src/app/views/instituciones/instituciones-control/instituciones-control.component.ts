import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { InstitucionesViewComponent } from '../../../components/instituciones/instituciones-view/instituciones-view.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-instituciones-control',
  standalone: true,
  imports: [NavbarComponent, InstitucionesViewComponent, FooterComponent],
  templateUrl: './instituciones-control.component.html',
  styleUrl: './instituciones-control.component.css'
})
export class InstitucionesControlComponent {

}
