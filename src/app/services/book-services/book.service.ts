import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { enviroment } from '../../../enviroment/enviroment';
import { Book } from '../../../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = `${enviroment.apiUrl}/Books`;

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]> (this.apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  createNewBook(Book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, Book);
  }

  updateBook(id:number, newBook: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, newBook);
  }

  deleteBook(id:number): Observable<void> {
    console.info(`Api link: ${this.apiUrl}/${id}`);
    return this.http.delete<void> (`${this.apiUrl}/${id}`);
  }
}
