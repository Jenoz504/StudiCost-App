import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { GastosViewComponent } from '../../../components/gastos/gastos-view/gastos-view.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-gastos-control',
  standalone: true,
  imports: [NavbarComponent,GastosViewComponent, FooterComponent],
  templateUrl: './gastos-control.component.html',
  styleUrl: './gastos-control.component.css'
})
export class GastosControlComponent {

}
