import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { IUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IAuthLogin, IAuthRegister } from '../models/auth';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);

  public currentUser = this.currentUserSubject.asObservable();
  public isAuthenticated = this.currentUser.pipe(map(user => Boolean(user)));

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  public login(credentials: IAuthLogin): Observable<{ user: IUser }> {
    return this.http
      .post<{ user: IUser }>('/users/login', { user: credentials })
      .pipe(tap(({ user }) => this.setAuth(user)));
  }

  public register(credentials: IAuthRegister): Observable<{ user: IUser }> {
    return this.http
      .post<{ user: IUser }>('/users', { user: credentials })
      .pipe(tap(({ user }) => this.setAuth(user)));
  }

  public logout(): Promise<boolean> {
    this.clearAuth();
    return this.router.navigate(['/login']);
  }

  public getCurrentUser(): Observable<{ user: IUser }> {
    return this.http.get<{ user: IUser }>('/user').pipe(
      tap({
        next: ({ user }) => this.setAuth(user),
        error: () => this.clearAuth(),
      }),
      shareReplay(1)
    );
  }

  private setAuth(user: IUser): void {
    this.currentUserSubject.next(user);
    this.localStorageService.setToken(user.token);
  }

  private clearAuth(): void {
    this.currentUserSubject.next(null);
    this.localStorageService.removeToken();
  }
}
