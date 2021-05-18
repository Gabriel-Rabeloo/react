import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function PasswordEdit() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;
    const fixSpaces = (string) => string.trim().replace(/\s{2,}/g, ' ');

    const passwordOk = fixSpaces(password);

    if (passwordOk.length < 3 || passwordOk.length > 255) {
      toast.error('Senha precisa ter entre 6 e 50 caracteres, sem espaços');
      formErrors = true;
    }

    if (password !== password2) {
      toast.error('Senhas não conferem');
      formErrors = true;
    }

    if (formErrors) return;

    setIsLoading(true);

    dispatch(actions.passwordEditRequest({ email, code, password, id }));

    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Digite suas informações para redefinir sua senha </h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>

        <label htmlFor="code">
          Código
          <input
            type="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Código de confirmação"
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha"
          />
        </label>

        <label htmlFor="password2">
          Repita a senha
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Nova senha"
          />
        </label>

        <button type="submit">Confirmar</button>
      </Form>
    </Container>
  );
}
