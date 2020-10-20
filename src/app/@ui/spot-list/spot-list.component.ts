import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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
  public title = null;

  @Output()
  public itemClicked: EventEmitter<Spot> = new EventEmitter<Spot>();

  constructor() { }

  ngOnInit(): void {
  }

  public emitItemClicked(event, spot: Spot) {
    this.itemClicked.emit(spot);
  }
}
