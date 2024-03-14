import { Component } from '@angular/core';
import { PeriodosCreationComponent } from '../periodos-creation/periodos-creation.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PeriodoViewComponent } from '../../../components/periodos/periodo-view/periodo-view.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-periodos-control',
  standalone: true,
  imports: [PeriodosCreationComponent, NavbarComponent, PeriodoViewComponent,FooterComponent],
  templateUrl: './periodos-control.component.html',
  styleUrl: './periodos-control.component.css'
})
export class PeriodosControlComponent {

}
