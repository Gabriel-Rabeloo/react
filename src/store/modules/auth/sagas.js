import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);

    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Login efetuado com sucesso');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    const status = get(e, 'response.status', 0);

    if (status === 403) {
      toast.error('Confirme sue e-mail para fazer login.');

      yield put(actions.loginFailure());

      history.push('/confirmation');
    } else {
      toast.error('Usuário ou senha inválidos');
    }
    yield put(actions.loginFailure());
  }
}

function* confirmationRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens/confirmation', payload);

    yield put(actions.confirmationSuccess({ ...response.data }));

    toast.success('E-mail confirmado com sucesso');

    history.push('/');
  } catch (e) {
    toast.error('Código inválido');

    yield put(actions.confirmationFailure());
  }
}

function* passwordRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens/password', payload);

    const { email } = payload;

    yield put(actions.passwordSuccess({ ...response.data }));

    toast.success(`E-mail para redefinir a senha enviado para: ${email}`);

    history.push('/password/edit');
  } catch (e) {
    toast.error('E-mail não encontrado');

    yield put(actions.passwordFailure());
  }
}

function* passwordEditRequest({ payload }) {
  try {
    const response = yield call(axios.put, '/tokens/password', payload);

    yield put(actions.passwordEditSuccess({ ...response.data }));

    toast.success('Senha alterada com sucesso');

    history.push('/');
  } catch (e) {
    toast.error('Dados inválidos');

    yield put(actions.passwordEditFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Dados alterados com sucesso');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Cadastro realizado com sucesso');
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido. Isso é tudo que sabemos');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.CONFIRMATION_REQUEST, confirmationRequest),
  takeLatest(types.PASSWORD_REQUEST, passwordRequest),
  takeLatest(types.PASSWORD_EDIT_REQUEST, passwordEditRequest),
]);
