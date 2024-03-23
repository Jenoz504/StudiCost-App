import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { GastosModel } from '../models/GastosModel';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8000/api/gastos/';

  guardarGasto(Gasto: GastosModel): Observable<any> {
    return this.http.post<any>(this.url, Gasto).pipe(catchError((error: HttpErrorResponse) =>{
      let errorMessage = "";

      if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else{
        errorMessage = `Error Code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage)
    }));
  }

  eliminarGasto(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  obtenerGastosDelEstudiante(nombreEstudiante:any):Observable<any>{
    return this.http.get(this.url+ 'porEstudiante/'+ nombreEstudiante);
  }

  obtenerGastoPorId(id:any):Observable<any>{
    return this.http.get(this.url + id);
  }

  obtenerGastoPorCategoria(idCategoria:any):Observable<any>{
    return this.http.get(this.url + 'porcategoria/' + idCategoria);
  }

  acualizarGasto(id:String, Gastos: any): Observable<any> {

    return this.http.put(this.url + id, Gastos);
  }
}
