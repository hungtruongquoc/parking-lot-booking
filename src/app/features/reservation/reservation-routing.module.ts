import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationListPage} from './pages/reservation-list/reservation-list.page';
import {ReservationCreatePage} from './pages/reservation-create/reservation-create.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationListPage,
    data: {
      title: 'Reservation List',
      description: 'List of current reservation',
      robots: 'index, follow',
    },
    children: [
      {
        path: 'create',
        component: ReservationCreatePage,
        data: {
          title: 'Make New Reservation',
          description: 'Create a new reservation',
          robots: 'index, follow',
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
