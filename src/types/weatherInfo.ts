import { IGeocodingResult } from './geoCodingResponse';
import { IWeatherResponse } from './meteoForecastResponse';

export interface IWeatherInfo {
  location: IGeocodingResult;
  weather: IWeatherResponse;
  zip?: string;
}
