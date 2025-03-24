import { Component } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class CitySearchComponent {
  search = new FormControl('', [Validators.minLength(2)])

  getErrorMessage() {
    return this.search.hasError('minLength')
      ? 'Type more than one character to search'
      : ''
  }
}
