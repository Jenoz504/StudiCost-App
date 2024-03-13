import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
@Component({
  selector: 'app-periodo-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,MatNativeDateModule ],
  templateUrl: './periodo-form.component.html',
  styleUrl: './periodo-form.component.css'
})
export class PeriodoFormComponent {

}
