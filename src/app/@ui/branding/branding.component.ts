import {ChangeDetectionStrategy, Component} from '@angular/core';

// @ts-ignore
@Component({
  selector: 'branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandingComponent {}
