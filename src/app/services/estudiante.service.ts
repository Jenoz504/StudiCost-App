import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { EstudiantesModel } from '../models/EstudiantesModel';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {

  constructor(private http: HttpClient) {  }
  url = 'http://localhost:8000/api/estudiantes/';


  private idEstudiante = new BehaviorSubject<String | null>(null);
  setIdEstudiante(id: String) {
    this.idEstudiante.next(id);
  }
  getIdEstudiante() {
    return this.idEstudiante.asObservable();
  }

  getEstudianteById(id:any):Observable<any>{
    return this.http.get(this.url +'byid/' + id);
  }

  getEstudiantePorUsuario(usuario:any):Observable<any>{
    return this.http.get(this.url+ 'byusuario/'+ usuario);
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
