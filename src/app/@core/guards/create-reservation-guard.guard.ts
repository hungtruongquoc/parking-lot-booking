import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectNewReservation} from '@core/store/Reservation';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateReservationGuardGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.store) {
      return this.store.select(selectNewReservation).pipe(switchMap((data) => {
        return of(data ? true : this.router.parseUrl('/reservation/create'));
      }));
    }
    return true;
  }
}
