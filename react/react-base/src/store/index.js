import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
// a store é o local centralizado onde o estado da aplicação é armazenado.

// ações são objetos que descrevem o que vai acontecer.

// reducer são funções que especeficam como é que o estado muda em função de uma ação.
// com o state atual + uma ação retornam um novo estado.

// o switch funciona como uma estrutura de controlo de fluxo ou seja para determinar o estado da ação.

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;

// -> ação -> reducer(listener) -> newState || actualState
// middleware -> ação (request) -> redux saga -> reducer -> success || fail
