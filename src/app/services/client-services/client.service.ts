import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { enviroment } from '../../../enviroment/enviroment';
import { Client } from '../../../models/client-model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${enviroment.apiUrl}/Clients`;

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]> (this.apiUrl);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  createNewClient(Client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, Client);
  }

  updateClient(id:number, newClient: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, newClient);
  }

  deleteClient(id:number): Observable<void> {
    console.info(`${this.apiUrl}/${id}`);
    return this.http.delete<void> (`${this.apiUrl}/${id}`);
    
  }
}
