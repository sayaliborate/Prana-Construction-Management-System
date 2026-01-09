import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabourService {
 // ✅ Correct base URL for Labour API
  private baseUrl = 'http://127.0.0.1:8000/api/employees/labours/';

  constructor(private http: HttpClient) {}

  // ➕ Add new labour
  addLabour(labourData: any): Observable<any> {
    return this.http.post(this.baseUrl, labourData);
  }

  // 📋 Retrieve all labours
  getLabours(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // 🧾 Get single labour by ID
  getLabourById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/`);
  }

  // ✏️ Update labour by ID
  updateLabour(id: number, labourData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, labourData);
  }

  // ❌ Delete labour by ID
  deleteLabour(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}