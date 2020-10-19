import { Type } from '@angular/core';

export interface FormStep {
  title: string;
  value: any;
  showEdit: boolean;
  field: string;
  component?: Type<any>;
  showComponent?: Type<any>;
  previousStep?: string;
}
