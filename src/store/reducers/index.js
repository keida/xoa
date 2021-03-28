import createReducer from './createReducer';
import deleteReducer from './deleteReducer';
import editReducer from './editReducer';
import completeReducer from './completeReducer';
import reduceReducers from 'reduce-reducers';
import checkReducer from './checkReducer';

const initialState = {
  completeDos: [],
  failDos: [],
  remindDos: [],
  loading: false,
  err: '',
  curCapacity: 0,
};

const reducer = reduceReducers(
  (state = initialState, action) => createReducer(state, action),
  (state = initialState, action) => editReducer(state, action),
  (state = initialState, action) => deleteReducer(state, action),
  (state = initialState, action) => completeReducer(state, action),
  (state = initialState, action) => checkReducer(state, action),
);

export default reducer;
