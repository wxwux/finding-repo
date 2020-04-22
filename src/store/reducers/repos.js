import { handleActions } from "redux-actions";

import {
  fetchReposByQuerySuccess,
  fetchReposByQueryRequest,
  fetchReposByQueryFailure,
} from "../actions";

const initialState = {
  pending: false,
  error: null,
  data: [],
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
        error: null
      };
    },
    [fetchReposByQuerySuccess]: (state, action) => {
      return {
        pending: false,
        error: null,
        responseTime: action.payload.responseTime,
        total: action.payload.total,
        data: action.payload.data,
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
  },
  initialState
);

export default repoReducer;
