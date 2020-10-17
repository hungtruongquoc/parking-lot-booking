// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {CommonModule} from '@angular/common';
import {ReservationListPage} from './pages/reservation-list/reservation-list.page';
import {ReservationRoutingModule} from './reservation-routing.module';
import {ReservationCreatePage} from './pages/reservation-create/reservation-create.page';
import {ReservationIndexPage} from './pages/reservation-index/reservation-index.page';
import {ReservationCtaPage} from './pages/reservation-cta/reservation-cta.page';

// @ts-ignore
@NgModule({
  declarations: [ReservationListPage, ReservationCreatePage, ReservationIndexPage, ReservationCtaPage],
  imports: [
    CommonModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule {
}
