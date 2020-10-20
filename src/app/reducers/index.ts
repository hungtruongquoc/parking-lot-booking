import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '@environments/environment';
import {reservationReducer} from '@app/reducers/reservation.reducer';

export interface State {
  newReservation?: any;
}

export const reducers: ActionReducerMap<State> = {};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
