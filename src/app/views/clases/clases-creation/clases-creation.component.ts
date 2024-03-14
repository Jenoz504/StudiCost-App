import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ClasesFormComponent } from '../../../components/clases/clases-form/clases-form.component';

@Component({
  selector: 'app-clases-creation',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ClasesFormComponent],
  templateUrl: './clases-creation.component.html',
  styleUrl: './clases-creation.component.css'
})
export class ClasesCreationComponent {

}
