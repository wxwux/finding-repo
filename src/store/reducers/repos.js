import { handleActions } from "redux-actions";

import { fetchReposByQuerySuccess } from "../actions";

const initialState = {
  pending: false,
  error: false,
  data: [],
  responseTime: 0,
  total: 0,
  pagination: {},
};

const repoReducer = handleActions(
  {
    [fetchReposByQuerySuccess]: (state, action) => {
      return {
        pending: false,
        error: false,
        responseTime: action.payload.responseTime,
        total: action.payload.total,
        data: action.payload.data,
        pagination: action.payload.pagination,
      };
    },
  },
  initialState
);

export default repoReducer;
