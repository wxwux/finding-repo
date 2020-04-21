import { handleActions } from "redux-actions";
import {
  fetchSingleRepoSuccess,
  fetchSingleRepoRequest,
  fetchSingleRepoFailure,
} from "../actions";

const initialState = {
  pending: true,
  error: null,
  data: null,
};

const singleRepoReducer = handleActions(
  {
    [fetchSingleRepoRequest]: (state, action) => ({
      ...state,
      error: null,
      pending: true,
    }),
    [fetchSingleRepoSuccess]: (state, action) => ({
      ...state,
      pending: false,
      data: action.payload,
    }),
    [fetchSingleRepoFailure]: (state, action) => ({
      ...state,
      pending: false,
      error: action.payload,
    })
  },
  initialState
);

export default singleRepoReducer;
