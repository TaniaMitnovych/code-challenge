import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WeatherMap } from 'src/assets/weather/WeatherMap';
import { WeatherService } from '../weather.service';
import { Weather } from '../types/Weather';
import { Coordinates } from '../types/User';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  @Input() coordinates: Coordinates;
  forecast: Weather;
  weatherIcon: string;
  refreshTimer: Observable<number> = timer(0, 5000);
  refreshTimerSubscription: Subscription;
  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.refreshTimerSubscription = this.refreshTimer.subscribe(() => this.setWeather());
  }

  setWeather() {
    this.weatherService.getWeather(this.coordinates.latitude, this.coordinates.longitude)
      .subscribe((data) => {
        this.forecast = data;
        let weatherCode: number = this.forecast.current_weather.weathercode;
        weatherCode = weatherCode in WeatherMap ? weatherCode : 0;
        this.weatherIcon = WeatherMap[weatherCode as keyof typeof WeatherMap];
      })
  }

  ngOnDestroy(): void {
    this.refreshTimerSubscription.unsubscribe();
  }
}
