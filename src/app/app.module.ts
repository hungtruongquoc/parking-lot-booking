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
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {spotReducerMapper} from '@core/store/Spot';
import {reducer} from '@core/store/Reservation';
import {EffectsModule} from '@ngrx/effects';
import {SpotEffects} from '@core/store/Spot/effects';
import {SpotService} from '@core/services/spot-service';

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
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreModule.forRoot({reservation: reducer, spot: spotReducerMapper}),
    EffectsModule.forRoot([SpotEffects])
  ],
  providers: [
    SpotService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
