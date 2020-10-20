import {
  Component,
  ComponentFactoryResolver, OnDestroy,
  OnInit
} from '@angular/core';

import {Store} from '@ngrx/store';
import {Reservation, selectNewReservation, State, updateNewReservationSpotAction} from '../../../../@core/store/Reservation';
import {Spot, selectSpotList, getSpotList, getAvailableSpot} from '../../../../@core/store/Spot';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {faArrowLeft, faPen} from '@fortawesome/pro-light-svg-icons';

@Component({
  templateUrl: './reservation-create-spot.page.html',
  styleUrls: ['./reservation-create-spot.page.scss']
})
export class ReservationCreateSpotPage implements OnInit, OnDestroy {
  public iconBack = faArrowLeft;
  public $newReservation: Observable<Reservation>;
  public $spots: Observable<Spot[]>;
  public selectedSpot: number = null;
  public newReservation: any = null;
  public subscriptions: Subscription[] = [];
  public iconEdit = faPen;
  public showEdit = false;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<State>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.$newReservation = this.store.select(selectNewReservation) as Observable<Reservation>;
    this.$spots = this.store.select(selectSpotList) as Observable<Spot[]>;
    this.store.dispatch(getAvailableSpot());
    this.subscriptions.push(this.$newReservation.subscribe(data => {
      if (data) {
        this.newReservation = {...data};
      }
    }));
  }

  public updateSelectedSpot(data: Spot) {
    if (data) {
      this.store.dispatch(updateNewReservationSpotAction(data));
      this.showEdit = false;
    }
  }

  public ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length > 0) {
      let currentSub = this.subscriptions.pop();
      do {
        currentSub.unsubscribe();
        currentSub = this.subscriptions.pop();
      } while (currentSub);
    }
  }

  public showReviewPage() {
    this.router.navigateByUrl('/reservation/create-review-pay');
  }
}
