import {
  Component,
  ComponentFactoryResolver,
  OnInit
} from '@angular/core';

import {Store} from '@ngrx/store';
import {Reservation, selectNewReservation, State} from '../../../../@core/store/Reservation';
import {Spot, selectSpotList, getSpotList} from '../../../../@core/store/Spot';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './reservation-create-spot.page.html',
  styleUrls: ['./reservation-create-spot.page.scss']
})
export class ReservationCreateSpotPage implements OnInit {

  public $newReservation: Observable<Reservation>;
  public $spots: Observable<Spot[]>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<State>,
              private router: Router) {}

  ngOnInit(): void {
    this.$newReservation = this.store.select(selectNewReservation) as Observable<Reservation>;
    this.$spots = this.store.select(selectSpotList) as Observable<Spot[]>;
    this.store.dispatch(getSpotList());
  }
}
