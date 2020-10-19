import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DateTimeEditComponent} from '@app/@ui';

describe('DateTimeEditComponent', () => {
  let component: DateTimeEditComponent;
  let fixture: ComponentFixture<DateTimeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
