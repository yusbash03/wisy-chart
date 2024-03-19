import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

   baseUrl = `https://api.weather.gov/gridpoints/`;

  constructor(private httpClient: HttpClient) {}

  getWeatherForecast(code: string): Observable<any> {
    
    //return this.http.get<any>(apiUrl);
    return this.httpClient.get<any>(`${this.baseUrl}${code}/31,80/forecast`);
  }
}
