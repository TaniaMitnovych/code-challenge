import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { UserData } from './types/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<UserData> {
    return this.http.get<UserData>('https://randomuser.me/api/');
  }
  getUsers(number: number): Observable<UserData[]> {
    let userRequests: Observable<UserData>[] = [];
    for (let i = 0; i <= number; i++) {
      const request = this.getUser();
      userRequests.push(request);
    }
    return forkJoin(userRequests);
  }
  getSavedUsers():UserData[]{
    const savedUsers = localStorage.getItem('savedUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  }
}
