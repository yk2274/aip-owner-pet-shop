import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Pet, PetRequest } from '../interface/pet';

@Injectable({providedIn: 'root'})
export class PetService {

  private readonly api = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.api}/pets`).pipe(
      tap(pets => console.log(pets)),
      catchError(this.handleError)
    );
  }

  addPet(pet: PetRequest): Observable<Pet> {
    return this.http.post<Pet>(`${this.api}/pets`, pet, this.httpOptions).pipe(
      tap((newPet: Pet) => console.log(`pet added`)),
      catchError(this.handleError)
    );
  }
   

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`Error status: ${error.status}, Error message: ${error.message}`));
  }
}
