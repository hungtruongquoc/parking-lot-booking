// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {CommonModule} from '@angular/common';
import {ReservationListPage} from './pages/reservation-list/reservation-list.page';
import {ReservationRoutingModule} from './reservation-routing.module';
import {ReservationCreatePage} from './pages/reservation-create/reservation-create.page';
import {ReservationIndexPage} from './pages/reservation-index/reservation-index.page';
import {ReservationCtaPage} from './pages/reservation-cta/reservation-cta.page';
// Import your AvatarModule
import {AvatarModule} from 'ngx-avatar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {EditFieldDirective, ShowFieldDirective} from './directives';
import {VehicleEditComponent, VehicleShowComponent} from './components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {DateTimeEditComponent, DateTimeShowComponent} from '@app/@ui';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';
// @ts-ignore
@NgModule({
  declarations: [
    ReservationListPage, ReservationCreatePage, ReservationIndexPage, ReservationCtaPage, EditFieldDirective,
    VehicleEditComponent, ShowFieldDirective, VehicleShowComponent, DateTimeShowComponent, DateTimeEditComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    AvatarModule,
    FontAwesomeModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzDatePickerModule,
    NzTimePickerModule,
    FormsModule
  ]
})
export class ReservationModule {
}
