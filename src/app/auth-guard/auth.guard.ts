import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('AuthToken') || '';
    if (token.length > 0) {
      return true;
    } else {
      // not logged in so redirect to signup page with the return url
      this.router.navigate(['/signup']);
      return false;
    }
  }
}
