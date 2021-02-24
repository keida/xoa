import * as actionTypes from '../actions/actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.COMPLETE_PENDING:
      return Object.assign({}, state, { loading: true });
    case actionTypes.COMPLETE_SUCCESS:
      let newComplete = state.remindDos[action.payload];
      state.remindDos.splice(action.payload, 1);
      return Object.assign({}, state, {
        loading: false,
        completeDos: [...state.completeDos, newComplete],
      });
    case actionTypes.COMPLETE_FAILURE:
      return Object.assign({}, state, {
        loading: true,
        err: action.payload,
      });
    default:
      return state;
  }
};
export default reducer;
