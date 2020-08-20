import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  private currentUserTokenSubject: BehaviorSubject<string>;
  public currentUserToken: Observable<string>;

  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated: Observable<boolean>;

  constructor(private router: Router, private toastr: ToastrService) {
    this.currentUserTokenSubject = new BehaviorSubject<string>(this.getToken());
    this.currentUserToken = this.currentUserTokenSubject.asObservable();

    const isLoggedIn = this.getToken().length > 0 ? true : false;
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
  }

  public logout(message?: string) {
    this.navigateToHome(message);
  }

  public get isUserAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  public get authenticatedToken(): string {
    return this.currentUserTokenSubject.value;
  }

  // Setting auth token and user details to localstorage
  public setAuthToken(user: any) {
    localStorage.setItem('AuthToken', user.social_id);
    localStorage.setItem('UserDetails', JSON.stringify(user));
    this.currentUserTokenSubject.next(user.social_id);
    this.isAuthenticatedSubject.next(true);
  }

  public getToken(): string {
    const token = localStorage.getItem('AuthToken') || '';
    if (token && this.isAuthenticatedSubject && !this.isUserAuthenticated) {
      this.isAuthenticatedSubject.next(true);
    }
    return token;
  }

  // Resetting tokens and navigating to root path
  private navigateToHome(message) {
    this.removeAuthToken();
    this.router.navigate(['/']);
    if (message) {
      this.toastr.error(message);
    } else {
      this.toastr.success('Logged out successfully');
    }
  }

  // Clearing all tokens from localstorage
  private removeAuthToken() {
    localStorage.clear();
    sessionStorage.clear();
    this.currentUserTokenSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}
