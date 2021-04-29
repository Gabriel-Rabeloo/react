import * as types from '../types';

export function clickButtonRequest() {
  return {
    type: types.BUTTON_CLICKED_REQUEST,
  };
}

export function clickButtonSuccess() {
  return {
    type: types.BUTTON_CLICKED_SUCCESS,
  };
}

export function clickButtonFailure() {
  return {
    type: types.BUTTON_CLICKED_FAILURE,
  };
}
