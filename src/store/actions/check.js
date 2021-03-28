import * as actionTypes from './actionTypes';

import { mock } from '../utils/tool';
class Actions {
  static begin() {
    return {
      type: actionTypes.CHECK_PENDING,
    };
  }
  static ok(data, cb) {
    cb && 'function' === typeof cb && cb(data);
    return {
      type: actionTypes.CHECK_SUCCESS,
      payload: data,
    };
  }
  static fail(data, cb) {
    cb && 'function' === typeof cb && cb(data);
    return {
      type: actionTypes.CHECK_FAILURE,
      payload: data,
    };
  }
}

const actionCreator = (data, cb) => {
  return (dispatch, getState) => {
    dispatch(Actions.begin());
    mock()
      .then(() => {
        dispatch(Actions.ok(data, cb));
      })
      .catch(error => dispatch(Actions.fail(error || 'Create failed', cb)));
  };
};
export default actionCreator;

