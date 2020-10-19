import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'date-time-show',
  templateUrl: './date-time-show.component.html',
  styleUrls: ['./date-time-show.component.scss']
})
export class DateTimeShowComponent implements OnInit {
  @Input()
  value: Date = null;
  @Input()
  title = 'Date Time';

  constructor() { }

  ngOnInit(): void {
  }

}
