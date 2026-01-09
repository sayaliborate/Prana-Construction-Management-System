import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private baseUrl = 'http://127.0.0.1:8000/api/';
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}token/`, { username, password }).pipe(
      tap(res => {
        localStorage.setItem(this.accessTokenKey, res.access);
        localStorage.setItem(this.refreshTokenKey, res.refresh);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  storeAccessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  refreshToken() {
    const refresh = this.getRefreshToken();
    if (!refresh) return throwError(() => new Error('No refresh token'));
    return this.http.post<any>(`${this.baseUrl}token/refresh/`, { refresh }).pipe(
      tap(res => {
        if (res.access) this.storeAccessToken(res.access);
        if (res.refresh) localStorage.setItem(this.refreshTokenKey, res.refresh);
      })
    );
  }
}