import * as actionTypes from '../actions/actionTypes';
import sizeof from 'object-sizeof';
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.EDIT_PENDING:
      return Object.assign({}, state, { loading: true });
    case actionTypes.EDIT_SUCCESS:
      let i = action.payload.index;
      delete action.payload.index;
      let prevSize = sizeof(state.remindDos[i]),
        curSize = sizeof(action.payload);
      state.remindDos[i] = action.payload;
      return Object.assign({}, state, {
        loading: false,
        remindDos: [...state.remindDos],
        curCapacity: state.curCapacity - prevSize + curSize,
      });
    case actionTypes.EDIT_FAILURE:
      return Object.assign({}, state, {
        loading: true,
        err: action.payload,
      });
    default:
      return state;
  }
};
export default reducer;
