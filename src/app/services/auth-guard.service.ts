import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _auth: AuthService, private _route: Router) {}

  canActivate(): boolean {
    if (!this._auth.isLoggedIn()) {
      this._route.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
