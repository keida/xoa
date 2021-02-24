import * as actionTypes from '../actions/actionTypes';
import sizeof from 'object-sizeof'
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.DELETE_PENDING:
      return Object.assign({}, state, { loading: true });
    case actionTypes.DELETE_SUCCESS:
      let curData = state.remindDos[action.payload],
        curDataSize = sizeof(curData);
      state.remindDos.splice(action.payload, 1);
      return Object.assign({}, state, {
        loading: false,
        curCapacity: state.curCapacity - curDataSize,
      });
    case actionTypes.DELETE_FAILURE:
      return Object.assign({}, state, {
        loading: true,
        err: action.payload,
      });
    default:
      return state;
  }
};
export default reducer;
