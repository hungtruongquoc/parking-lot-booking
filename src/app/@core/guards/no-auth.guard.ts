// @ts-ignore
import { Injectable } from '@angular/core';
// @ts-ignore
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@app/@auth';
// @ts-ignore
import { Observable } from 'rxjs';

// @ts-ignore
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }
}
