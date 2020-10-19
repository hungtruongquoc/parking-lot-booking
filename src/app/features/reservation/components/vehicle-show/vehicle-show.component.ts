import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '@core/interfaces';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vehicle-show',
  templateUrl: './vehicle-show.component.html',
  styleUrls: ['./vehicle-show.component.scss']
})
export class VehicleShowComponent implements OnInit {
  @Input() value: Vehicle;

  constructor() {
  }

  ngOnInit(): void {

  }

}
