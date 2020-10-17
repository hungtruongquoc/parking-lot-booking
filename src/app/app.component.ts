// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {SeoService} from '@core/services';
import {ActivatedRoute} from '@angular/router';
import {faHome, faSignOut} from '@fortawesome/pro-light-svg-icons';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public faHome = faHome;
  public faSignOut = faSignOut;
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
