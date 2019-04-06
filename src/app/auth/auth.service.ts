import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  register(formValue: any) {
    this.http.post<any>(`${this.apiUrl}api/register`, formValue)
      .subscribe((response) => {
        this.router.navigate(['login']);
      });
  }

  login(formValue: any) {
    this.http.post<any>(`${this.apiUrl}api/login`, formValue)
      .subscribe((response) => {
        localStorage.setItem('token', response.toString());
        this.router.navigate(['games-list']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
