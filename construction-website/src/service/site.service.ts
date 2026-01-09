import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
private baseUrl = 'http://127.0.0.1:8000/api/projects/';

  constructor(private http: HttpClient) {}

  getTeamLeaders(): Observable<any> {
    // Assuming you have endpoint /api/users/?role=team_leader or similar
    return this.http.get('http://127.0.0.1:8000/api/company/team-members/');
  }

  addSite(data: any) {
  return this.http.post(`${this.baseUrl}sites/`, data); // ✅ trailing slash
}


  getSites(): Observable<any> {
    return this.http.get(`${this.baseUrl}sites/`);
  }

   private apiUrl = 'http://127.0.0.1:8000/api/employees/supervisors/';

  getSupervisors(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


}
