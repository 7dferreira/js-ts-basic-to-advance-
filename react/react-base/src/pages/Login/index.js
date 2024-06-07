import React from 'react';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragraph } from './styled';

export default function Login() {
  // O dispatch é um método usado para despachar ações (actions).
  // é a maneira principal de enviar uma ação para o reducer, que, por sua vez, atualiza o estado da aplicação com base nessa ação.

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch({
      type: 'BOTAO_CLICADO',
    });
  }
  return (
    <Container>
      <Title>
        Login
        <small>Oi</small>
      </Title>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
      <button type='button' onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
