import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[showField]',
})
export class ShowFieldDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
