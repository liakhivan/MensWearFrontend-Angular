import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { productsPerPageModel } from '../models/productsPerPageModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductsForHomePage(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductsPerPage(pageSize: number, page: number): Observable<productsPerPageModel> {
    return this.http.get<productsPerPageModel>(`${environment.apiUrl}products?pageSize=${pageSize}&page=${page}`)
      .pipe(
        catchError(this.handleError)
      );
  }




  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    return throwError('Something bad happened. Please try again later.');
  }
}
