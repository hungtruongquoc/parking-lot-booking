import {Action, createAction, createReducer, on, props} from '@ngrx/store';
import {Spot} from '@core/store/Spot';

export const UPDATE_NEW_RESERVATION_SPOT = '[Reservation Features] Update Spot';

export interface Reservation {
  licensePlate?: string;
  checkInDate?: number;
  checkOutDate?: number;
  spotId?: number;
  rate?: number;
}

export interface State {
  newReservation: any;
}

export const initialState: State = {
  newReservation: null
};

export const newReservationAction = createAction(
  '[Reservation Feature] New Reservation'
);

export const updateNewReservationAction = createAction(
  '[Reservation Feature] Update New Reservation',
  props<Reservation>()
);

export const updateNewReservationSpotAction = createAction(
  UPDATE_NEW_RESERVATION_SPOT,
  props<Spot>()
);

export const reservationReducer = createReducer(initialState,
  on(newReservationAction, state => {
    return {...state, newReservation: {}};
  }),
  on(updateNewReservationAction, (state, reservation) => {
    return {...state, newReservation: {...reservation}};
  }),
  on(updateNewReservationSpotAction, (state, spot) => {
    debugger;
    return {...state, newReservation: {...state.newReservation, spotId: spot.spotId, rate: spot.rate}};
  })
);

export const selectNewReservation = (state: any) => {
  return state.reservation.newReservation;
};

export function reducer(state: State | undefined, action: Action) {
  return reservationReducer(state, action);
}
