import { handleActions } from "redux-actions";
import { fetchSingleRepoSuccess, fetchSingleRepoRequest } from "../actions";

const initialState = {
  pending: true,
  error: null,
  data: null,
};

const singleRepoReducer = handleActions(
  {
    [fetchSingleRepoRequest]: (state, action) => ({
      ...state,
      pending: true
    }),
    [fetchSingleRepoSuccess]: (state, action) => ({
      ...state,
      pending: false,
      data: action.payload
    })
  }, initialState
);

export default singleRepoReducer;
