import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common'
import { Component } from '@angular/core'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { Observable } from 'rxjs'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
  standalone: true,
  imports: [FlexModule, DecimalPipe, DatePipe, AsyncPipe],
})
export class CurrentWeatherComponent {
  current$: Observable<ICurrentWeather>
  constructor(private weatherService: WeatherService) {
    this.current$ = this.weatherService.currentWeather$
  }

  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }
}
