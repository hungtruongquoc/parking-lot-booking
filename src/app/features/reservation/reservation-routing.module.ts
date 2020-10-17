import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationListPage} from './pages/reservation-list/reservation-list.page';
import {ReservationCreatePage} from './pages/reservation-create/reservation-create.page';
import {ReservationIndexPage} from './pages/reservation-index/reservation-index.page';
import {ReservationCtaPage} from './pages/reservation-cta/reservation-cta.page';

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
