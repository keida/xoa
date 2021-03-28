import * as actionTypes from '../actions/actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.EDIT_PENDING:
      return Object.assign({}, state);
    case actionTypes.CHECK_SUCCESS:
      let curDone = state.remindDos[action.payload];
      state.remindDos.splice(action.payload, 1);
      return Object.assign({}, state, {
        failDos: [...state.failDos, curDone],
      });
    case actionTypes.CHECK_FAILURE:
      return Object.assign({}, state, {
        err: action.payload,
      });
    default:
      return state;
  }
};
export default reducer;
