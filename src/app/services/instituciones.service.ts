import { Injectable } from '@angular/core';
import { InstitucionesModel } from '../models/InstitucionesModel';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  constructor(private http: HttpClient) { }

  url = 'http://localhost:8000/api/Instituciones/';

  guardarInstituciones(Instituciones: InstitucionesModel): Observable<any> {
    return this.http.post<any>(this.url, Instituciones).pipe(catchError((error: HttpErrorResponse) =>{
      let errorMessage = "";

      if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else{
        errorMessage = `Error Code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage)
    }));
  }

  eliminarInstituciones(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  obtenerInstitucionesDelEstudiante(idEstudiante:any):Observable<any>{
    return this.http.get(this.url+ 'porestudiante/'+ idEstudiante);
  }

  obtenerInstitucionesPorId(id:any):Observable<any>{
    return this.http.get(this.url + id);
  }

  acualizarInstituciones(id:String, Instituciones: any): Observable<any> {

    return this.http.put(this.url + id, Instituciones);
  }
}
