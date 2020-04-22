import { handleActions } from "redux-actions";
import { fetchReadmeSuccess, fetchReadmeFailure } from "../actions";

const initialState = {
  pending: false,
  error: false,
  data: null,
};

const readmeReducer = handleActions(
  {
    [fetchReadmeSuccess]: (state, action) => ({
      pending: false,
      error: false,
      data: action.payload,
    }),
    [fetchReadmeFailure]: (state, action) => ({
      pending: false,
      error: action.payload,
      data: null
    })
  },
  initialState
);

export default readmeReducer;
