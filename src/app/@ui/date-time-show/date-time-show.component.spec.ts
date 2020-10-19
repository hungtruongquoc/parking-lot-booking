import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeShowComponent } from './date-time-show.component';

describe('DateTimeShowComponent', () => {
  let component: DateTimeShowComponent;
  let fixture: ComponentFixture<DateTimeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
