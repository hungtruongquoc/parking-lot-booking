import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationListPage} from './pages/reservation-list/reservation-list.page';
import {ReservationCreatePage} from './pages/reservation-create/reservation-create.page';
import {ReservationIndexPage} from './pages/reservation-index/reservation-index.page';
import {ReservationCtaPage} from './pages/reservation-cta/reservation-cta.page';
import {ReservationCreateSpotPage} from './pages/reservation-create-spot/reservation-create-spot.page';
import {CreateReservationGuardGuard} from '../../@core/guards/create-reservation-guard.guard';
import {ReservationCreateReviewPage} from './pages/reservation-create-review/reservation-create-review.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationIndexPage,
    data: {
      title: 'Reservation List',
      description: 'List of current reservation',
      robots: 'index, follow',
    },
    children: [
      {
        path: 'index',
        component: ReservationCtaPage,
        data: {
          title: 'How Can We Help',
          description: 'Main page of reservation',
          robots: 'follow',
        }
      },
      {
        path: 'create',
        component: ReservationCreatePage,
        data: {
          title: 'Make New Reservation',
          description: 'Create a new reservation',
          robots: 'follow',
        }
      },
      {
        path: 'create-spot',
        component: ReservationCreateSpotPage,
        canActivate: [CreateReservationGuardGuard],
        data: {
          title: 'Spot For New Reservation',
          description: 'Add a spot to a new reservation',
          robots: 'follow',
        }
      },
      {
        path: 'create-review-pay',
        component: ReservationCreateReviewPage,
        canActivate: [CreateReservationGuardGuard],
        data: {
          title: 'Pay For New Reservation',
          description: 'Payment for the new a new reservation',
          robots: 'follow',
        }
      },
      {
        path: 'list',
        component: ReservationListPage,
        data: {
          title: 'Transaction List',
          description: 'List of all transactions',
          robots: 'follow',
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {
}
