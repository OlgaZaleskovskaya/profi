import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    let isAuth = this.authService.isAuthenticated;
    const role = this.authService.role;
    console.log('guard role', role);
    if (!isAuth) {
      this.router.navigate(['auth/login']);

    } else if (role != "master") {
      this.router.navigate(['/']);
      isAuth = false;
    }
    return isAuth;;
  }

}