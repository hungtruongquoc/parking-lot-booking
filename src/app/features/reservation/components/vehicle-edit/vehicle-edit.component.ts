import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Vehicle} from '@core/interfaces';
import {faTimes, faCheck} from '@fortawesome/pro-light-svg-icons';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {
  public iconCancel = faTimes;
  public iconSubmit = faCheck;
  @Input()
  initialValue: Vehicle;

  @Output() cancelClicked = new EventEmitter<any>();
  @Output() submitClicked = new EventEmitter<Vehicle>();

  public vehicleForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      licensePlate: [
        this.initialValue && this.initialValue.licensePlate ? this.initialValue.licensePlate : '',
        [Validators.required]
      ]
    });
  }

  emitCancelClicked() {
    this.cancelClicked.emit();
  }

  onFormSubmit() {
    for (const i in this.vehicleForm.controls) {
      this.vehicleForm.controls[i].markAsDirty();
      this.vehicleForm.controls[i].updateValueAndValidity();
    }
    if (this.vehicleForm.valid) {
      this.submitClicked.emit(this.vehicleForm.value);
    }
  }
}
