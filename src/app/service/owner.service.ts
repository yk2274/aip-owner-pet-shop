import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Owner, OwnerRequest } from '../interface/owner';

@Injectable({providedIn: 'root'})
export class OwnerService {
  
  private readonly api = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  constructor(private http: HttpClient) { }

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${this.api}/owners`).pipe(
      tap(owners => console.log("All owners fetched")),
      catchError(this.handleError)
    );
  }

  addOwner(owner: OwnerRequest): Observable<Owner> {
    return this.http.post<Owner>(`${this.api}/owners`, owner, this.httpOptions).pipe(
      tap((newOwner: Owner) => console.log(`owner added`)),
      catchError(this.handleError)
    );
  } 

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`Error status: ${error.status}, Error message: ${error.message}`));
  }
}
