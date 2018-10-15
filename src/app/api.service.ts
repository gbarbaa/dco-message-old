import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


let httpOptions = {
  headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
};

const dealerEndpoint = 'https://www.servicesus.ford.com/dealer/Dealers?make=Ford&dealerName=';

const apiUrl = "/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }


private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
};

private extractData(res: Response) {
  let body = res;
  return body || { };
}

/** Get Dealer */

getDealer(dealerName): Observable<any> {
  return this.httpClient.get(dealerEndpoint + dealerName, { responseType: 'text' }).pipe(
    map(this.extractData));
}


/***   Campaigns ***/

getCampaigns(): Observable<any> {
  return this.httpClient.get(apiUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getCampaign(id: string): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.httpClient.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postCampaign(data): Observable<any> {
  return this.httpClient.post(apiUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updateCampaign(id, data): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.httpClient.put(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

deleteCampaign(id: string): Observable<{}> {
  const url = `${apiUrl}/${id}`;
  return this.httpClient.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

/***   DCOs ***/

getDcos(): Observable<any> {
  return this.httpClient.get(apiUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getDco(id: string): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.httpClient.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postDco(data): Observable<any> {
  return this.httpClient.post(apiUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updateDco(id, data): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.httpClient.put(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

deleteDco(id: string): Observable<{}> {
  const url = `${apiUrl}/${id}`;
  return this.httpClient.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}


}

