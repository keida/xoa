import * as actionTypes from '../actions/actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHECK_FAILURE:
      let curDone = state.remindDos[action.payload];
      state.remindDos.splice(action.payload, 1);
      return Object.assign({}, state, {
        failDos: [...state.failDos, curDone],
      });
    default:
      return state;
  }
};
export default reducer;
