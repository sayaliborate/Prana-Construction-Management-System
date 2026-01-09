import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddClientService {
private baseUrl = 'http://127.0.0.1:8000/api/billing/clients/'; // Update if your base URL differs

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addClient(clientData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.baseUrl, clientData, { headers });
  }

  // getClients(): Observable<any> {
  //   const headers = this.getAuthHeaders();
  //   return this.http.get(this.baseUrl, { headers });
  // }


   getClients(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Get single client
  getClient(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/`);
  }

  // Add new client
 
  // Update client
  updateClient(id: number, clientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, clientData);
  }

  // Delete client
  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }

}
