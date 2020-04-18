import { handleActions } from "redux-actions";
import { fetchReadmeSuccess } from "../actions";

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
  },
  initialState
);

export default readmeReducer;
