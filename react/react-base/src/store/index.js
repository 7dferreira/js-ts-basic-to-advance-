import { legacy_createStore as createStore } from 'redux';

const initialState = {
  botaoClicado: false,
};

// a store é o local centralizado onde o estado da aplicação é armazenado.

// ações são objetos que descrevem o que vai acontecer.

// reducer são funções que especeficam como é que o estado muda em função de uma ação.
// com o state atual + uma ação retornam um novo estado.

// o switch funciona como uma estrutura de controlo de fluxo ou seja para determinar o estado da ação.

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOTAO_CLICADO': {
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    default: {
      return state;
    }
  }
};

const store = createStore(reducer);

export default store;

// -> ação -> reducer(listener) -> newState
