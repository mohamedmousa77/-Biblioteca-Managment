import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Author } from '../../../models/author-model';
import { enviroment } from '../../../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = `${enviroment.apiUrl}/Authors`;

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]> (this.apiUrl);
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  createNewAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }

  updateAuthor(id:number, newAuthor: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/${id}`, newAuthor);
  }

  deleteAuthor(id:number): Observable<void> {
    return this.http.delete<void> (`${this.apiUrl}/${id}`);
  }
}
