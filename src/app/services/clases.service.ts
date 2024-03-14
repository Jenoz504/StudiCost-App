import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ClasesModel } from '../models/ClasesModel';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8000/api/clases/';

  guardarClase(Clase: ClasesModel): Observable<any> {
    return this.http.post<any>(this.url, Clase).pipe(catchError((error: HttpErrorResponse) =>{
      let errorMessage = "";

      if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else{
        errorMessage = `Error Code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage)
    }));
  }

  eliminarClase(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  obtenerClasesDelEstudiante(nombreEstudiante:any):Observable<any>{
    return this.http.get(this.url+ 'porestudiante/'+ nombreEstudiante);
  }

  obtenerClasePorId(id:any):Observable<any>{
    return this.http.get(this.url + id);
  }

  acualizarClase(id:String, Clase: any): Observable<any> {

    return this.http.put(this.url + id, Clase);
  }
}
