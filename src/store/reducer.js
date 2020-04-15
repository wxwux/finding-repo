import { handleActions } from "redux-actions";

import { fetchReposSuccess } from "./actions";

const initialState = {
  pending: false,
  error: false,
  data: [],
};

const rootReducer = handleActions(
  {
    [fetchReposSuccess]: (state, action) => ({
      pending: true,
      error: false,
      data: action.payload,
    }),
  },
  initialState
);

export default rootReducer;
