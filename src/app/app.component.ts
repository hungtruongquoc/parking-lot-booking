// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {SeoService} from '@core/services';
import {ActivatedRoute} from '@angular/router';
import {faHome, faSignOut, faCalendarAlt} from '@fortawesome/pro-light-svg-icons';
import {faHome as faSolidHome, faCalendarAlt as faSolidCalendarAlt} from '@fortawesome/pro-solid-svg-icons';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public faHome = faHome;
  public faSignOut = faSignOut;
  public iconReservation = faCalendarAlt;
  public iconActiveHome = faSolidHome;
  public iconActiveReservation = faSolidCalendarAlt;

  public links: object[] = [
    {title: 'One', fragment: 'one'},
    {title: 'Two', fragment: 'two'}
  ];

  constructor(private seoService: SeoService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.seoService.init();
  }
}
