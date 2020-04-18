import { handleActions } from "redux-actions";
import { fetchSingleRepoSuccess, fetchSingleRepoRequest } from "../actions";

const initialState = {
  pending: false,
  error: false,
  data: null
}

const singleRepoReducer = handleActions(
  {
    [fetchSingleRepoRequest]: (state, action) => ({
      pending: true,
      error: false,
      data: null
    }),
    [fetchSingleRepoSuccess]: (state, action) => ({
      pending: false,
      error: false,
      data: action.payload
    })
  }, initialState
);


export default singleRepoReducer;

