import { handleActions } from "redux-actions";

import { fetchReposByQuerySuccess } from "./actions";

const initialState = {
  pending: false,
  error: false,
  data: [],
  pagination: []
};

const rootReducer = handleActions(
  {
    [fetchReposByQuerySuccess]: (state, action) => ({
      pending: true,
      error: false,
      data: action.payload.data,
      pagination: action.payload.pagination
    }),
  },
  initialState
);

export default rootReducer;
