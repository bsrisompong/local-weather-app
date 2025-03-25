import { Component } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { debounceTime, filter, tap } from 'rxjs/operators'

import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class CitySearchComponent {
  search = new FormControl('', [Validators.minLength(2)])

  constructor(private weatherService: WeatherService) {
    this.search.valueChanges
      .pipe(
        takeUntilDestroyed(),
        filter((value) => value !== null && this.search.valid),
        filter((value): value is string => value !== null),
        debounceTime(1000),
        tap((searchValue: string) => this.doSearch(searchValue)),
        takeUntilDestroyed()
      )
      .subscribe()
  }

  doSearch(searchValue: string) {
    const userInput = searchValue.split(',').map((s) => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined
    this.weatherService.updateCurrentWeather(searchText, country)
  }

  getErrorMessage() {
    return this.search.hasError('minLength')
      ? 'Type more than one character to search'
      : ''
  }
}
