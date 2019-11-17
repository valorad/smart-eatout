import { Injectable } from '@angular/core';

import { DataService } from './data.service';

import * as secrets from "../../environments/secrets.json";

import { WeatherInfo } from '../_interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  secret = secrets.weatherKey;

  convertToCelsius = (weatherInfo: WeatherInfo) => {
    if (weatherInfo.main) {
      weatherInfo.main.temp = weatherInfo.main.temp - 273.15;
    }
    return weatherInfo;
  };

  getWeatherByLocation = (latitude: number, longotude: number) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${this.secret}&lat=${latitude}&lon=${longotude}`;
    return new Promise<WeatherInfo>( (resolve, reject) => {
      let obs = this.dataService.getData(url, this.convertToCelsius);
      obs.subscribe(
        (weather) => {
          resolve(weather);
        },
        (error) => {
          reject(error);
        }
      )
    });
    
  };

  constructor(
    private dataService: DataService
  ) { }
}
