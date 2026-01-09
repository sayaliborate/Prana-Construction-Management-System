import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
 private baseUrl = 'http://127.0.0.1:8000/api/employees/supervisors/';

  constructor(private http: HttpClient) {}

  // Add supervisor
  addSupervisor(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Get list of supervisors
  getSupervisors(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
