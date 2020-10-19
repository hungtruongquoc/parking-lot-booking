import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { FormBuilder, FormGroup } from '@angular/forms';
import {faCheck, faTimes} from '@fortawesome/pro-light-svg-icons';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'date-time-edit',
  templateUrl: './date-time-edit.component.html',
  styleUrls: ['./date-time-edit.component.scss']
})
export class DateTimeEditComponent implements OnInit {
  public today = new Date();
  public locale = en_US;
  public dateValue: Date;
  public timeValue: Date;
  public dateTimeForm: FormGroup;
  public iconSubmit = faCheck;
  public iconCancel = faTimes;

  @Output()
  public cancelClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public submitClicked: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(private fb: FormBuilder, private i18n: NzI18nService) {}

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  }

  public onCancelClick() {
    this.cancelClicked.emit();
  }

  public onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  public onTimeChanged(result: Date): void {
    console.log('on time changed: ', result);
  }

  public submitForm() {
    const {date, time} = this.dateTimeForm.value;
    const newDateValue = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
    this.submitClicked.emit(newDateValue);
  }

  ngOnInit(): void {
    this.i18n.setLocale(en_US);
    this.dateTimeForm = this.fb.group({
      date: [null],
      time: [null]
    });
  }
}
