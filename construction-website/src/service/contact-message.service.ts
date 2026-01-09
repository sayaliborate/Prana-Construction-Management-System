import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
private baseUrl = 'http://127.0.0.1:8000/api/company/contact-messages/';

  constructor(private http: HttpClient) {}

  // POST: Send a new contact message
  sendMessage(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // GET: List all messages (for admin)
  getMessages(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // GET: List unread messages
  getUnreadMessages(): Observable<any> {
    return this.http.get(`${this.baseUrl}unread/`);
  }

  // PATCH: Mark message as read
  markAsRead(id: number, isRead: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}${id}/`, { is_read: isRead });
  }
}