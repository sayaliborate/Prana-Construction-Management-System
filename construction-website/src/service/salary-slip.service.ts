import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalarySlipService {
 private baseUrl = 'http://127.0.0.1:8000/api/employees/salary-slips/';

  constructor(private http: HttpClient) {}

  // ➕ Add Salary Slip
  addSalarySlip(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // 📋 Retrieve all Salary Slips
  getSalarySlips(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // 🔍 Get Salary Slips by Month and Year
  getSalarySlipByMonthYear(month: number, year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}by_month/?month=${month}&year=${year}`);
  }

  // ❌ Delete Salary Slip
  deleteSalarySlip(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
