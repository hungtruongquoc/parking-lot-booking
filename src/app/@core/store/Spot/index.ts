import {Action, createAction, createReducer, on, props} from '@ngrx/store';
import * as faker from 'faker';

export const GET_SPOT_LIST = '[Spot Feature] Get A List of Spots';
export const UPDATE_SPOT_LIST = '[Spot Feature] Update Spot List';

export interface Spot {
  spotId?: number;
  rate?: number;
  available?: boolean;
}

export interface SpotState {
  spots?: any[];
}

export const initialSpotState: SpotState = {
  spots: []
};

export const getSpotList = createAction(GET_SPOT_LIST);
export const updateSpotList = createAction(UPDATE_SPOT_LIST, props<{payload: any}>());

export const selectSpotList = (state: any) => {
  return state.spot.spots;
};

export const spotReducer = createReducer(initialSpotState,
  // on(getSpotList, state => {
  //   const list = Array(50);
  //   list.fill({});
  //   return {
  //     ...state,
  //     spots: list.map((item) => {
  //       return {rate: faker.finance.amount(), spotId: faker.random.number(), available: faker.random.boolean()};
  //     })
  //   };
  // }),
  on(updateSpotList, (state, {payload}) => {
    return {
      ...state,
      spots: [...payload.spots]
    };
  })
);

export function spotReducerMapper(state: SpotState | undefined, action: Action) {
  return spotReducer(state, action);
}
