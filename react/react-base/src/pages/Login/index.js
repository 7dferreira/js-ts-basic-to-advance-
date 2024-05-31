import React from 'react';

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragraph } from './styled';

export default function Login() {
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
