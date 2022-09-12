import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private API_URL = 'https://62bef7eb0bc9b125616437f8.mockapi.io/user';

  constructor(private http: HttpClient) {}

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }
  addNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}`, user, this.httpOptions);
  }

  updateUserInfo(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.API_URL}/${user.id}`,
      user,
      this.httpOptions
    );
  }

  deleteUserById(id: string): Observable<User> {
    return this.http.delete<User>(`${this.API_URL}/${id}`);
  }
}
