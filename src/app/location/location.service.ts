import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { location } from './location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseUrl: string = "http://localhost:3000/locations";
  constructor(private httpClient: HttpClient) { }

  getAllLocation(): Observable<any> {
    return this.httpClient.get(this.baseUrl)
  }

  getLocationForStudent(): Observable<location[]> {
    return this.httpClient.get<location[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: Observable<any>) {
    console.error("an error occurred:", error)
    return throwError(() => new Error('test'))
  }
  createLocation(location: location): Observable<any> {
    return this.httpClient.post(this.baseUrl, location);
  }
  deleteLocation(id: string) {
    return this.httpClient.delete(this.baseUrl + "/" + id)
  }
  updateLocation(id: string, location: location): Observable<any> {
    return this.httpClient.put<location>(`${this.baseUrl}/${id}`, location);
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<location>(`${this.baseUrl}/${id}`);
  }

}
