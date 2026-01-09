import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
private baseUrl = 'http://127.0.0.1:8000/api/projects/';

  constructor(private http: HttpClient) {}

  // Get all projects
  getProjects(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Add a new project
  addProject(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // Get a single project
  getProject(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/`);
  }

  // Update project
  updateProject(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, data);
  }

  // Delete project
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
