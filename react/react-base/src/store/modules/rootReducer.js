import { combineReducers } from 'redux';

import reducer from './example/reducer';

export default combineReducers({
  example: reducer,
});
