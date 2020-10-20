import {
  Component,
  ComponentFactoryResolver, OnDestroy,
  OnInit
} from '@angular/core';

import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {selectNewReservation} from '../../../../@core/store/Reservation';

@Component({
  templateUrl: './reservation-create-review.page.html',
  styleUrls: ['./reservation-create-review.page.scss']
})
export class ReservationCreateReviewPage implements OnInit, OnDestroy {

  public newReservation$: Observable<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store,
              private router: Router) {
  }

  ngOnInit(): void {
    this.newReservation$ = this.store.select(selectNewReservation) as Observable<any>;
  }

  public ngOnDestroy() {
  }

  public showReviewPage() {
  }
}
