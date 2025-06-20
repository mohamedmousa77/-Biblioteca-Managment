import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Loan } from '../../../models/loan-model';
import { enviroment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
private apiUrl = `${enviroment.apiUrl}/Prestito`;

  constructor(private http: HttpClient) { }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]> (this.apiUrl);
  }

  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  createNewLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  updateLoan(id:number, newLoan: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}`, newLoan);
  }

  deleteLoan(id:number): Observable<void> {
    return this.http.delete<void> (`${this.apiUrl}/${id}`);
  }
}
