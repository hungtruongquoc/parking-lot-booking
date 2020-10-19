// @ts-ignore
import {HttpClientModule} from '@angular/common/http';
// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '@environments/environment';
import {CoreModule} from '@core/core.module';
import {LayoutModule} from './@ui';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// @ts-ignore
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrandingComponent} from '@ui/branding/branding.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// @ts-ignore
@NgModule({
  declarations: [AppComponent, BrandingComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
