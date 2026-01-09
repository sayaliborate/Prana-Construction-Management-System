import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private roleSubject!: BehaviorSubject<string | null>; // note the "!" to tell TS we'll initialize it in constructor
  role$ = this.roleSubject?.asObservable();           // will be set properly after constructor runs

  constructor() {
    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
    this.roleSubject = new BehaviorSubject<string | null>(role);
    this.role$ = this.roleSubject.asObservable();      // assign here after initialization
  }

  setRole(role: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('role', role);
    }
    this.roleSubject.next(role);
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }

  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isTeamLeader(): boolean {
    return this.getRole() === 'supervisor';
  }

  isUser(): boolean {
    return this.getRole() === 'user';
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.roleSubject.next(null);
  }
}