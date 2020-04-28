import { handleActions } from "redux-actions";

import {
  fetchReposByQuerySuccess,
  fetchReposByQueryRequest,
  fetchReposByQueryFailure,
  getReposFromCache,
  clearReposCache
} from "../actions";

const initialState = {
  pending: false,
  error: null,
  data: [],
  storage: {},
  responseTime: 0,
  total: 0,
  pagination: {},
};

const repoReducer = handleActions(
  {
    [fetchReposByQueryRequest]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: null,
      };
    },
    [fetchReposByQuerySuccess]: (state, action) => {
      return {
        pending: false,
        error: null,
        responseTime: action.payload.responseTime,
        total: action.payload.total,
        data: action.payload.data,
        storage: { ...state.storage, ...action.payload.storage },
        pagination: action.payload.pagination,
      };
    },
    [fetchReposByQueryFailure]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    },
    [getReposFromCache]: (state, action) => {
      return {
        pending: false,
        error: null,
        data: action.payload.data,
        storage: {...state.storage},
        responseTime: 0,
        total: state.total,
        pagination: action.payload.pagination
      }
    },
    [clearReposCache]: (state, action) => {
      return {
        ...state,
        storage: {}
      }
    }
  },
  initialState
);

export default repoReducer;
