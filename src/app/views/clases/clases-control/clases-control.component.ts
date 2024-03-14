import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ClasesFormComponent } from '../../../components/clases/clases-form/clases-form.component';
import { ClasesViewComponent } from '../../../components/clases/clases-view/clases-view.component';

@Component({
  selector: 'app-clases-control',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ClasesViewComponent],
  templateUrl: './clases-control.component.html',
  styleUrl: './clases-control.component.css'
})
export class ClasesControlComponent {

}
