import { Component, OnInit, Input } from '@angular/core';
import {differenceInHours} from 'date-fns';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  @Input()
  reservation: any;

  constructor() { }

  ngOnInit(): void {
  }

  public get durationByHours() {
    if (this.reservation.checkIn && this.reservation.checkOut) {
      const start = new Date(this.reservation.checkIn * 1000);
      const end = new Date(this.reservation.checkOut  * 1000);
      return differenceInHours(end, start);
    }
    return 0;
  }

  public get totalAmount() {
    return this.durationByHours * this.reservation.rate;
  }
}
