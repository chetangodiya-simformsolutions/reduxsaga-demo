import { createReducer } from 'reduxsauce';
import { UserPostTypes } from '../actions';
import { StaticTypes } from '../types';

const {
  REQUEST_USER_POST,
  FAILED_USER_POST,
  GET_SINGLE,
  FOUND_SINGLE,
  SUCCESS_USER_POST
} = UserPostTypes;
export const INITIAL_STATE = Object.freeze({
  fetching: false,
  error: null,
  todos: [],
  requestFor: null
});

const request = state => {
  return { ...state, fetching: true, error: null, list: null };
};

const success = (state, action) => {
  return { ...state, fetching: false, error: null, list: action.payload };
};

const failure = (state, action) => {
  return { ...state, fetching: false, error: action.payload, list: null };
};

const gotSingle = (state, action) => {
  return {
    ...state,
    fetching: false,
    error: null,
    singlePost: action.payload,
    requestFor: null
  };
};
const getSingle = (state, action) => {
  return { ...state, fetching: false, error: null, requestFor: action.payload };
};

const cancelFork = (state, action) => {
  return { ...state, requestFor: null };
};
const HANDLERS = {
  [REQUEST_USER_POST]: request,
  [FAILED_USER_POST]: failure,
  [GET_SINGLE]: getSingle,
  [FOUND_SINGLE]: gotSingle,
  [SUCCESS_USER_POST]: success,
  [StaticTypes.CANCEL_FORK_REQ]: cancelFork
};
export const userPostReducer = createReducer(INITIAL_STATE, HANDLERS);
