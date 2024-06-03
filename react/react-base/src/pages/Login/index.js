import React from 'react';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragraph } from './styled';

export default function Login() {
  toast.success('Conta criada com sucesso!');
  toast.error('Erro!');
  return (
    <Container>
      <Title>
        Login
        <small>Oi</small>
      </Title>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
      <button type='button'>Enviar</button>
    </Container>
  );
}
