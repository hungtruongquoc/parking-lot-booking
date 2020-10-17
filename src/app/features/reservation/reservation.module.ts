// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {CommonModule} from '@angular/common';
import {ReservationListPage} from './pages/reservation-list/reservation-list.page';
import {ReservationRoutingModule} from './reservation-routing.module';
import {ReservationCreatePage} from './pages/reservation-create/reservation-create.page';

// @ts-ignore
@NgModule({
  declarations: [ReservationListPage, ReservationCreatePage],
  imports: [
    CommonModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule {
}
