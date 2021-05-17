import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function EmailChecked() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    dispatch(actions.confirmationRequest({ email, code, id }));

    setIsLoading(false);
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>
        Digite o e-mail e o código que foi enviado via e-mail para a confirmação{' '}
      </h1>

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
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Código"
          />
        </label>

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
