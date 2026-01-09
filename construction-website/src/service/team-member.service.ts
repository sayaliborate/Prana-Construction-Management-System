import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {
private baseUrl = 'http://127.0.0.1:8000/api/company/team-members/'; // adjust if needed

  constructor(private http: HttpClient) {}

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  
  createTeamMember(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  getTeamMemberById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/`);
  }

  updateTeamMember(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, formData);
  }

  deleteTeamMember(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
