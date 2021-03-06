import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Student({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [nome, setName] = useState('');
  const [sobrenome, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setAge] = useState('');
  const [peso, setWeight] = useState('');
  const [altura, setHeight] = useState('');
  const [foto, setPicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Picture = get(data, 'Fotos[0].url', '');

        setPicture(Picture);

        setName(data.nome);
        setLastName(data.sobrenome);
        setEmail(data.email);
        setAge(data.idade);
        setWeight(data.peso);
        setHeight(data.altura);

        setIsLoading(false);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');

        setIsLoading(false);
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;
    const fixSpaces = (string) => string.trim().replace(/\s{2,}/g, ' ');

    const nameOk = fixSpaces(nome);
    const lastNameOk = fixSpaces(sobrenome);

    if (nameOk.length < 3 || nameOk.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (lastNameOk.length < 3 || lastNameOk.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inv??lido');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Idade precisa ser um numero inteiro');
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso precisa ser um numero de ponto flutuante');
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura precisa ser um numero de ponto flutuante');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
        history.push('/');
      } else {
        await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) cadastrado(a) com sucesso!');
        history.push('/');
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido. Isso ?? tudo que sabemos');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Editar aluno' : 'Novo Aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/pictures/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <div>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />
          </label>
          <label htmlFor="sobrenome">
            Sobrenome:
            <input
              type="text"
              value={sobrenome}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Sobrenome"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
            />
          </label>
          <label htmlFor="idade">
            Idade:
            <input
              type="number"
              value={idade}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Idade"
            />
          </label>
          <label htmlFor="peso">
            Peso
            <input
              type="text"
              value={peso}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Peso"
            />
          </label>
          <label htmlFor="altura">
            Altura:
            <input
              type="text"
              value={altura}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Altura"
            />
          </label>

          <button type="submit">{id ? 'Salvar' : 'Cadastrar'}</button>
        </Form>
      </div>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
