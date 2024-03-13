import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { PeriodosModel } from '../models/PeriodosModel';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  constructor(private http: HttpClient) {  }
  url = 'http://localhost:8000/api/periodos/';

  guardarPeriodo(Periodo: PeriodosModel): Observable<any> {
    return this.http.post<any>(this.url, Periodo).pipe(catchError((error: HttpErrorResponse) =>{
      let errorMessage = "";

      if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else{
        errorMessage = `Error Code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage)
    }));
  }

  eliminarPeriodo(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  obtenerPeriodosDelEstudiante(nombreEstudiante:any):Observable<any>{
    return this.http.get(this.url+ 'porestudiante/'+ nombreEstudiante);
  }

  obtenerPeriodoPorId(id:any):Observable<any>{
    return this.http.get(this.url + id);
  }

  acualizarPeriodo(id:String, periodos: any): Observable<any> {

    return this.http.put(this.url + id, periodos);
  }
}
