import {
  Component,
  ComponentFactoryResolver, OnDestroy,
  OnInit
} from '@angular/core';

import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {selectNewReservation} from '../../../../@core/store/Reservation';
import {differenceInHours} from 'date-fns';

@Component({
  templateUrl: './reservation-create-review.page.html',
  styleUrls: ['./reservation-create-review.page.scss']
})
export class ReservationCreateReviewPage implements OnInit, OnDestroy {

  public newReservation$: Observable<any>;
  public showPayment = false;
  public subscriptions: Subscription[] = [];
  public paymentAmount: number = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store,
              private router: Router) {
  }

  ngOnInit(): void {
    this.newReservation$ = this.store.select(selectNewReservation) as Observable<any>;
    this.newReservation$.subscribe(({checkIn, checkOut, rate}) => {
      this.paymentAmount = differenceInHours(new Date(checkOut * 1000), new Date(checkIn * 1000)) * rate;
    });
  }

  public ngOnDestroy() {
  }

  public showPaymentForm() {
    this.showPayment = true;
  }
}
