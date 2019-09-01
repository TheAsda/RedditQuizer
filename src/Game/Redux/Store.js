import { createStore, combineReducers } from 'redux';
import { updateCurrent, updateScore, updateAnswers } from './Reducers';

const reducer = combineReducers({ score: updateScore, current: updateCurrent, answers: updateAnswers });

const Store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default Store;
