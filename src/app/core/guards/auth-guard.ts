import { Injectable } from '@angular/core';
import { Auth } from '../providers/auth/auth';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authSrv: Auth, private router: Router) {}

  canActivate(): boolean {
    if (this.authSrv.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
