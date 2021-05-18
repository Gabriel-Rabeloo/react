import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

export function registerUpdatedSuccess(payload) {
  return {
    type: types.REGISTER_UPDATED_SUCCESS,
    payload,
  };
}

export function registerCreatedSuccess(payload) {
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload,
  };
}

export function registerRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}

export function registerFailure(payload) {
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
}

export function confirmationRequest(payload) {
  return {
    type: types.CONFIRMATION_REQUEST,
    payload,
  };
}

export function confirmationSuccess(payload) {
  return {
    type: types.CONFIRMATION_SUCCESS,
    payload,
  };
}

export function confirmationFailure(payload) {
  return {
    type: types.CONFIRMATION_FAILURE,
    payload,
  };
}

export function passwordRequest(payload) {
  return {
    type: types.PASSWORD_REQUEST,
    payload,
  };
}

export function passwordSuccess(payload) {
  return {
    type: types.PASSWORD_SUCCESS,
    payload,
  };
}

export function passwordFailure(payload) {
  return {
    type: types.PASSWORD_FAILURE,
    payload,
  };
}

export function passwordEditRequest(payload) {
  return {
    type: types.PASSWORD_EDIT_REQUEST,
    payload,
  };
}

export function passwordEditSuccess(payload) {
  return {
    type: types.PASSWORD_EDIT_SUCCESS,
    payload,
  };
}

export function passwordEditFailure(payload) {
  return {
    type: types.PASSWORD_EDIT_FAILURE,
    payload,
  };
}
