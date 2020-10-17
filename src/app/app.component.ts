// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {SeoService} from './@core/services';
import {ActivatedRoute} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

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
