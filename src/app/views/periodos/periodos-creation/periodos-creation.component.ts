import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PeriodoFormComponent } from '../../../components/periodos/periodo-form/periodo-form.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-periodos-creation',
  standalone: true,
  imports: [NavbarComponent, PeriodoFormComponent, FooterComponent],
  templateUrl: './periodos-creation.component.html',
  styleUrl: './periodos-creation.component.css'
})
export class PeriodosCreationComponent {

}
