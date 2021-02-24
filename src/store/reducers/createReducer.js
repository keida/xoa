import * as actionTypes from '../actions/actionTypes';
import sizeof from 'object-sizeof'
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PENDING:
      return Object.assign({}, state, { loading: true });
    case actionTypes.CREATE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        remindDos: [...state.remindDos, action.payload],
        curCapacity: state.curCapacity + sizeof(action.payload),
      });
    case actionTypes.CREATE_FAILURE:
      return Object.assign({}, state, {
        loading: true,
        err: action.payload,
      });
    default:
      return state;
  }
};
export default reducer;
