import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { GastosFormComponent } from '../../../components/gastos/gastos-form/gastos-form.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-gastos-creation',
  standalone: true,
  imports: [NavbarComponent,GastosFormComponent,FooterComponent],
  templateUrl: './gastos-creation.component.html',
  styleUrl: './gastos-creation.component.css'
})
export class GastosCreationComponent {

}
