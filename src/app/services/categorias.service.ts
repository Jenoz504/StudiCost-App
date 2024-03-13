import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriasModel } from '../models/CategoriasModel';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8000/api/categorias/';

  guardarCategoria(Categoria: CategoriasModel): Observable<any> {
    return this.http.post<any>(this.url, Categoria).pipe(catchError((error: HttpErrorResponse) =>{
      let errorMessage = "";

      if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else{
        errorMessage = `Error Code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage)
    }));
  }

  eliminarCategoria(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  obtenerCategoriasDelEstudiante(nombreEstudiante:any):Observable<any>{
    return this.http.get(this.url+ 'porEstudiante/'+ nombreEstudiante);
  }

  obtenerCategoriaPorId(id:any):Observable<any>{
    return this.http.get(this.url + id);
  }

  acualizarCategoria(id:String, categorias: any): Observable<any> {

    return this.http.put(this.url + id, categorias);
  }
}
