import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {SpotService} from '@core/services/spot-service';
import {GET_SPOT_LIST, UPDATE_SPOT_LIST} from '@core/store/Spot';

@Injectable()
export class SpotEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(GET_SPOT_LIST),
    mergeMap(() => this.spotService.getAll()
      .pipe(
        map(spots => {
          debugger;
          return {type: UPDATE_SPOT_LIST, payload: {spots}};
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(private actions$: Actions, private spotService: SpotService) {
  }
}
