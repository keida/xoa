import * as actionTypes from './actionTypes';

const actions = data => {
  return {
    type: actionTypes.CHECK_FAILURE,
    payload: data,
  };
};
export default actions;
