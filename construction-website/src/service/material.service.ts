import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
 private baseUrl = 'http://127.0.0.1:8000/api/inventory/materials/';

  constructor(private http: HttpClient) {}

  getMaterials(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
