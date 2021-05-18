import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Password() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    dispatch(actions.passwordRequest({ email, id }));

    setIsLoading(false);
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Digite seu e-mail </h1>

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

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
