// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/product'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  // Error handling function
  private handleError(error: any) {
    console.error('API Error: ', error);
    return throwError(error);
  }

  // GET /api/products/:id - Get product by ID
  getProductById(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST /api/products - Create a new product
  createProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PUT /api/products/:id - Update product by ID
  updateProduct(productId: string, updates: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<any>(url, updates)
      .pipe(
        catchError(this.handleError)
      );
  }

  // DELETE /api/products/:id - Delete product by ID
  deleteProduct(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET /api/products - Get all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getFilteredProducts(filters: any): Observable<any[]> {
    let params = new HttpParams();
    if (filters.name) {
      params = params.append('name', filters.name);
    }
    if (filters.minPrice) {
      params = params.append('minPrice', filters.minPrice);
    }
    if (filters.maxPrice) {
      params = params.append('maxPrice', filters.maxPrice);
    }

    return this.http.get<any[]>(this.apiUrl, { params });
  }

}


