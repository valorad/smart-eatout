interface WeatherSystem {
  type: number,
  id: number,
  message: number,
  country: string,
  sunrise: number,
  sunset: number
}

interface CloudData {
  all: number, // Cloudiness, %
}

interface WindData {
  speed: number,
  deg: number,
}

interface MainWeatherData {
  temp: number, // Temperature. Converted to Celsius in this project.
  pressure: number, // Atmospheric pressure, hPa
  humidity: number, // Humidity, %
  temp_min: number, // Minimum temperature at the moment. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  temp_max: number, // Maximum temperature at the moment. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
}

interface Weather {
  id: number, // Weather condition id
  main: string, // Group of weather parameters (Rain, Snow, Extreme etc.)
  description: string, // Weather condition within the group
  icon: string, // Weather icon id
}

interface GeoCoordinate {
  lon: number, // City geo location, longitude
  lat: number, // City geo location, latitude
}

export interface WeatherInfo {
  id: number,
  name: string,
  coord: GeoCoordinate,
  weather: Weather[],
  base: string,
  main: MainWeatherData,
  wind: WindData,
  clouds: CloudData,
  dt: number,
  sys: WeatherSystem,
  timezone: number,
  cod: number,
}