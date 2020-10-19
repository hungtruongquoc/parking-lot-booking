import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[editField]',
})
export class EditFieldDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
