import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Picture({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id');

  const [isLoading, setIsLoading] = React.useState(false);
  const [picturee, setPicture] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${id}`);
        setPicture(get(data, 'Fotos[0].url', ''));

        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        history.push('/');
      }
    };

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const picture = e.target.files[0];
    const PictureUrl = URL.createObjectURL(picture);

    setPicture(PictureUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('photo', picture);

    try {
      setIsLoading(true);

      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso!');

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto.');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="picturee">
          {picturee ? <img src={picturee} alt="Picturee" /> : 'Selecionar'}
          <input type="file" id="picturee" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Picture.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
