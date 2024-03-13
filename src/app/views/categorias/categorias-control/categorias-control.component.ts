import { Component } from '@angular/core';
import { CategoriasViewComponent } from '../../../components/categorias/categorias-view/categorias-view.component';
import { CategoriasCreationComponent } from '../categorias-creation/categorias-creation.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { MatButton } from '@angular/material/button';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-categorias-control',
  standalone: true,
  imports: [CategoriasViewComponent, CategoriasCreationComponent,NavbarComponent, CategoriasViewComponent,MatButton, FooterComponent],
  templateUrl: './categorias-control.component.html',
  styleUrl: './categorias-control.component.css'
})
export class CategoriasControlComponent {

}
