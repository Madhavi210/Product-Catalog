// category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/category'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  // Error handling function
  private handleError(error: any) {
    console.error('API Error: ', error);
    return throwError(error);
  }

  // POST /api/category - Create a new category
  createCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoryData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET /api/category/:id - Get category by ID
  getCategoryById(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PUT /api/category/:id - Update category by ID
  updateCategory(categoryId: string, formData: any): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.put<any>(url, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // DELETE /api/category/:id - Delete category by ID
  deleteCategory(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET /api/category - Get all categories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
}
