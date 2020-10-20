import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  OnInit,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {faPen, faTimes, faCheck, faTrashAlt, faPlus, faCalendar} from '@fortawesome/pro-light-svg-icons';
import {faCheckCircle, faExclamationTriangle} from '@fortawesome/pro-solid-svg-icons';
import {FieldEdit, FormStep} from '../../interfaces';
import {VehicleEditComponent, VehicleShowComponent} from '../../components';
import {EditFieldDirective} from '../../directives';
import {Observable, Subscription} from 'rxjs';
import {Vehicle} from '../../../../@core/interfaces';
import {getStatusTextColor, isCheckInDateValid} from '../../../../@core/helpers';
import {DateTimeEditComponent, DateTimeShowComponent} from '../../../../@ui';
import {ReservationModel} from '../../../../@core/models/reservation.model';
import {Store} from '@ngrx/store';
import {selectNewReservation, State, updateNewReservationAction} from '../../../../@core/store/Reservation';
import {Router} from '@angular/router';

@Component({
  templateUrl: './reservation-create.page.html',
  styleUrls: ['./reservation-create.page.scss']
})
export class ReservationCreatePage implements OnInit, AfterViewChecked, OnDestroy {
  public iconEdit = faPen;
  public iconInvalidValue = faTimes;
  public iconSubmit = faCheck;
  public iconCancel = faTimes;
  public iconAdd = faPlus;
  public iconDelete = faTrashAlt;
  public iconValid = faCheckCircle;
  public iconCalendar = faCalendar;
  public iconError = faExclamationTriangle;
  public errorMessage = null;
  private vehicleFormSubscriptions: Subscription[] = [];
  public isVehicleDateInfoValid = false;
  public showSpots = false;
  public $newReservation: any;
  public subscriptions: Subscription[] = [];

  @ViewChild(EditFieldDirective)
  private editField: EditFieldDirective;
  @ViewChildren(EditFieldDirective)
  private editFields: QueryList<EditFieldDirective>;

  private doRenderEditComponent = null;

  private formSteps: FormStep[] = [
    {
      title: 'Vehicle',
      value: null,
      showEdit: false,
      field: 'vehicle',
      component: VehicleEditComponent,
      showComponent: VehicleShowComponent
    },
    {
      title: 'Check In',
      value: null,
      showEdit: false,
      field: 'checkInDate',
      showComponent: DateTimeShowComponent,
      component: DateTimeEditComponent,
      previousStep: 'vehicle'
    },
    {
      title: 'Check Out',
      value: null,
      showEdit: false,
      field: 'checkOutDate',
      showComponent: DateTimeShowComponent,
      component: DateTimeEditComponent,
      previousStep: 'vehicle'
    },
  ];

  public get FormConfig() {
    return this.formSteps;
  }

  // Uses this set to tracking changes to the formSteps array for enabling/disabling the select spot button
  public set FormConfig(value) {
    this.formSteps = [...value];
  }

  public get reservationJson(): object {
    return {
      vehicle: this.FormConfig[0].value,
      checkIn: this.FormConfig[1].value,
      checkOut: this.FormConfig[2].value
    };
  }

  public get reservationObj(): ReservationModel {
    return new ReservationModel(this.FormConfig[0].value, this.FormConfig[1].value, this.FormConfig[2].value);
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<State>,
              private router: Router) {
    this.$newReservation = store.select(selectNewReservation) as Observable<any>;
    this.subscriptions.push(this.$newReservation.subscribe(data => {
      if (data) {
        this.FormConfig = this.FormConfig.map(item => {
          if ('vehicle' === item.field) {
            item.value = {...data.vehicle};
          }
          if ('checkInDate' === item.field) {
            item.value = data.checkIn;
          }
          if ('checkOutDate' === item.field) {
            item.value = data.checkOut;
          }
          return item;
        });
      }
    }));
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    if (this.doRenderEditComponent) {
      setTimeout(() => {
        this.loadComponent(this.doRenderEditComponent);
        this.doRenderEditComponent = null;
      }, 250);
    }
  }

  ngOnDestroy() {
    if (this.vehicleFormSubscriptions && this.vehicleFormSubscriptions.length > 0) {
      let currentSubscription: Subscription = null;
      do {
        currentSubscription = this.vehicleFormSubscriptions.pop();
        currentSubscription.unsubscribe();
      }
      while (!currentSubscription);
    }
    if (this.subscriptions && this.subscriptions.length > 0) {
      let currentSubscription: Subscription = null;
      do {
        currentSubscription = this.subscriptions.pop();
        currentSubscription.unsubscribe();
      }
      while (!currentSubscription);
    }
  }

  private getFieldForInjecting(fieldName): { field: FormStep, fieldIndex: number } {
    let fieldIndex = null;
    // Finds the component config for the selected field
    const field = this.FormConfig.find((item, index) => {
      if (fieldName === item.field && item.showEdit) {
        fieldIndex = index;
        return true;
      }
      return false;
    });
    return {field, fieldIndex};
  }

  private updateVehicleData(vehicle: Vehicle) {
    this.FormConfig = this.FormConfig.map(item => {
      const newItem = {...item};
      if ('vehicle' === item.field) {
        newItem.value = {...vehicle};
      }
      return newItem;
    });
  }

  private isValidCheckInDate(value: Date): boolean {
    this.errorMessage = null;
    let result = isCheckInDateValid(value);
    if (!result) {
      this.errorMessage = 'Check In Date has to be in the future.';
    }
    if (this.hasCheckOutDate) {
      const checkOutDate = new Date(this.FormConfig.find(item => 'checkOutDate' === item.field).value * 1000);
      result = result
        && this.isValidCheckOutDate(checkOutDate, value);
    }
    return result;
  }

  private isValidCheckOutDate(value: Date, checkInDate: Date = null): boolean {
    this.errorMessage = null;
    if (!checkInDate) {
      const checkInStep = this.FormConfig.find(item => 'checkInDate' === item.field);
      if (checkInStep && checkInStep.value) {
        checkInDate = new Date(checkInStep.value * 1000);
      }
    }
    if (checkInDate) {
      const result = value.getTime() > checkInDate.getTime();
      if (!result) {
        this.errorMessage = 'Check Out Date has to be greater than Check In Date';
      }
      return result;
    }
    return false;
  }

  private updateDateTimeInfo(fieldName: string, data: Date): void {
    this.FormConfig = this.FormConfig.map(item => {
      const newItem = {...item};
      if (fieldName === item.field) {
        // Converts the time to second for back end
        newItem.value = data.getTime() / 1000;
      }
      return newItem;
    });
  }

  private injectComponentToLocation(field: FormStep, fieldIndex: number = null) {
    if (field && field.component && 'undefined' !== typeof fieldIndex && null !== fieldIndex) {
      // Finds the corresponding view child using the above index since we generate a list of items in the template
      const currentLocation: EditFieldDirective = this.editFields.find((item, index) => fieldIndex === index);
      // Creates component and inject to the location
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(field.component);
      const viewContainerRef = currentLocation.viewContainerRef;
      viewContainerRef.clear();
      return viewContainerRef.createComponent<FieldEdit>(componentFactory);
    }
    return null;
  }

  private loadComponent(fieldName) {
    const {field, fieldIndex} = this.getFieldForInjecting(fieldName);
    const componentRef = this.injectComponentToLocation(field, fieldIndex);
    if (componentRef) {
      this.vehicleFormSubscriptions.push(componentRef.instance.cancelClicked.subscribe(this.onCancelClick.bind(this, fieldName)));
      if ('vehicle' === fieldName) {
        componentRef.instance.initialValue = {...field.value};
        this.vehicleFormSubscriptions.push(componentRef.instance.submitClicked.subscribe((data: Vehicle) => {
          this.updateVehicleData(data);
          this.toggleEditStatus(fieldName);
        }));
      }
      else if (['checkInDate', 'checkOutDate'].includes(fieldName)) {
        if (field.value) {
          componentRef.instance.dateValue = new Date(field.value * 1000);
          componentRef.instance.timeValue = new Date(field.value * 1000);
        }
        this.vehicleFormSubscriptions.push(componentRef.instance.submitClicked.subscribe((data: Date) => {
          if ('checkInDate' === fieldName && !this.isValidCheckInDate(data)) {
            return;
          }
          else if ('checkOutDate' === fieldName && !this.isValidCheckOutDate(data)) {
            return;
          }
          else {
            this.updateDateTimeInfo(fieldName, data);
            this.toggleEditStatus(fieldName);
          }
        }));
      }
      else {
        componentRef.instance.initialValue = field.value;
      }
    }
  }

  private toggleEditStatus(fieldName) {
    let showFieldName = null;
    this.FormConfig = this.FormConfig.map(item => {
      const newItem = {...item};
      newItem.showEdit = fieldName === item.field && !item.showEdit;
      if (newItem.showEdit) {
        showFieldName = fieldName;
      }
      return newItem;
    });
    this.doRenderEditComponent = showFieldName;
  }

  public deleteVehicleInfo() {
    this.FormConfig = this.FormConfig.map(item => {
      const newItem = {...item};
      if ('vehicle' === item.field) {
        newItem.value = null;
      }
      return newItem;
    });
  }

  public deleteDateInfo(fieldName: string): void {
    this.FormConfig = this.FormConfig.map(item => {
      const newItem = {...item};
      if (fieldName === item.field) {
        newItem.value = null;
      }
      return newItem;
    });
  }

  public onEditButtonClick(event, step: FormStep) {
    this.toggleEditStatus(step.field);
  }

  public onCancelClick(fieldName) {
    this.errorMessage = null;
    this.toggleEditStatus(fieldName);
  }

  public isValidStep(step: FormStep): boolean {
    if ('vehicle' === step.field) {
      return step.value && step.value.licensePlate;
    }
    if (['checkInDate', 'checkOutDate'].includes(step.field)) {
      try {
        return step.value && !isNaN(parseInt(step.value, 10));
      } catch (exception) {
        return false;
      }
    }
    return false;
  }

  public isPreviousStepValid(fieldName: string): boolean {
    const step = this.FormConfig.find(item => fieldName === item.field);
    return this.isValidStep(step);
  }

  public getStatusTextClass(step) {
    console.log(getStatusTextColor(this.isValidStep(step)));
    return getStatusTextColor(this.isValidStep(step));
  }

  public get hasEditFieldActive(): boolean {
    return this.FormConfig.some(item => item.showEdit);
  }

  public get hasCheckOutDate(): boolean {
    return this.FormConfig.some(item => 'checkOutDate' === item.field && 'undefined' !== typeof item.value
      && null !== item.value);
  }

  public updateNewReservation() {
    this.showSpots = true;
    this.store.dispatch(updateNewReservationAction(this.reservationJson));
    this.router.navigateByUrl('/reservation/create-spot');
  }
}
