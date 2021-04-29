import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

const request = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exampleResquest() {
  try {
    yield call(request);
    yield put(actions.clickButtonSuccess());
  } catch {
    toast.error('Deu erro');
    yield put(actions.clickButtonFailure());
  }
}

export default all([takeLatest(types.BUTTON_CLICKED_REQUEST, exampleResquest)]);
