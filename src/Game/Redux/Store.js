import { createStore } from 'redux';
import { updateCurrent } from './Reducers';

const Store = createStore(
  updateCurrent,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default Store;
