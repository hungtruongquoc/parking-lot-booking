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
import {faCheckCircle} from '@fortawesome/pro-solid-svg-icons';
import {FieldEdit, FormStep} from '../../interfaces';
import {VehicleEditComponent, VehicleShowComponent} from '../../components';
import {EditFieldDirective} from '../../directives';
import {Subscription} from 'rxjs';
import {Vehicle} from '../../../../@core/interfaces';
import {getStatusTextColor, isCheckInDateValid} from '../../../../@core/helpers';
import {DateTimeEditComponent, DateTimeShowComponent} from '../../../../@ui';

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

  private vehicleFormSubscriptions: Subscription[] = [];

  @ViewChild(EditFieldDirective)
  private editField: EditFieldDirective;
  @ViewChildren(EditFieldDirective)
  private editFields: QueryList<EditFieldDirective>;

  private doRenderEditComponent = null;

  public formSteps: FormStep[] = [
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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
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
  }

  private getFieldForInjecting(fieldName): { field: FormStep, fieldIndex: number } {
    let fieldIndex = null;
    // Finds the component config for the selected field
    const field = this.formSteps.find((item, index) => {
      if (fieldName === item.field && item.showEdit) {
        fieldIndex = index;
        return true;
      }
      return false;
    });
    return {field, fieldIndex};
  }

  private updateVehicleData(vehicle: Vehicle) {
    this.formSteps = this.formSteps.map(item => {
      const newItem = {...item};
      if ('vehicle' === item.field) {
        newItem.value = {...vehicle};
      }
      return newItem;
    });
  }

  private isValidCheckInDate(value: Date): boolean {
    return isCheckInDateValid(value);
  }

  private updateDateTimeInfo(fieldName: string, data: Date): void {
    this.formSteps = this.formSteps.map(item => {
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
      this.vehicleFormSubscriptions.push(componentRef.instance.cancelClicked.subscribe(() => {
        this.toggleEditStatus(fieldName);
      }));
      if ('vehicle' === fieldName) {
        componentRef.instance.initialValue = {...field.value};
        this.vehicleFormSubscriptions.push(componentRef.instance.submitClicked.subscribe((data: Vehicle) => {
          this.updateVehicleData(data);
          this.toggleEditStatus(fieldName);
        }));
      }
      else if (['checkInDate', 'checkOutDate'].includes(fieldName)) {
        this.vehicleFormSubscriptions.push(componentRef.instance.submitClicked.subscribe((data: Date) => {
          if ('checkInDate' === fieldName && !this.isValidCheckInDate(data)) {
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
    this.formSteps = this.formSteps.map(item => {
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
    this.formSteps = this.formSteps.map(item => {
      const newItem = {...item};
      if ('vehicle' === item.field) {
        newItem.value = null;
      }
      return newItem;
    });
  }

  public deleteDateInfo(fieldName: string): void {
    this.formSteps = this.formSteps.map(item => {
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

  public onCancelClick(event, step: FormStep) {
    this.toggleEditStatus(step.field);
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
    const step = this.formSteps.find(item => fieldName === item.field);
    return this.isValidStep(step);
  }

  public getStatusTextClass(step) {
    return getStatusTextColor(this.isValidStep(step));
  }

  public get hasEditFieldActive(): boolean {
    return this.formSteps.some(item => item.showEdit);
  }
}
