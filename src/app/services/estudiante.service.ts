import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EstudiantesModel } from '../models/EstudiantesModel';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {

  constructor(private http: HttpClient) {  }
  url = 'http://localhost:8000/api/estudiantes/';

  getEstudiantes(id:any):Observable<any>{
    return this.http.get(this.url, id);
  }

  getEstudianteById(username:any):Observable<any>{
    return this.http.get(this.url, username);
  }

  eliminarEstudiante(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarEstudiante(Estudiante: EstudiantesModel): Observable<any> {
    return this.http.post<any>(this.url, Estudiante).pipe(catchError((error: HttpErrorResponse) =>{
      let errorMessage = "";


      if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else{
        errorMessage = `Error Code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage)
    }));
  }
}
