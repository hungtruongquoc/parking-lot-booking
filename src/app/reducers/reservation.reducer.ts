import {ActionType} from '@ngrx/store';
import {State} from '@app/reducers/index';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const NEW_RESERVATION = 'NEW_RESERVATION';

export class NewReservation implements ActionType<any> {
  type = NEW_RESERVATION;
  payload: any;
}

export function reservationReducer(state: State = {}, action: ActionType<any>) {
  switch (action.type) {
    case NEW_RESERVATION:
      return {...state, newReservation: {licensePlate: null, checkInDate: null, checkOutDate: null}};
    default:
      return state;
  }
}
