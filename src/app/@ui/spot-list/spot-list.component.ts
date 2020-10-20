import {Component, Input, OnInit} from '@angular/core';
import {Spot} from '@core/store/Spot';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.scss']
})
export class SpotListComponent implements OnInit {
  @Input()
  public spotSource: Spot[] = null;

  @Input()
  public title = 'List of Spots';

  constructor() { }

  ngOnInit(): void {
  }

}
