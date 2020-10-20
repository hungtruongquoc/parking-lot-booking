import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../../reducers';
import {newReservationAction} from '../../../../@core/store/Reservation';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './reservation-cta.page.html',
  styleUrls: ['./reservation-cta.page.scss']
})
export class ReservationCtaPage implements OnInit {

  constructor(private store: Store<State>, private router: Router) {
  }

  ngOnInit(): void {
  }

  public openNewReservationForm() {
    this.store.dispatch(newReservationAction());
    this.router.navigateByUrl('/reservation/create');
  }

}
