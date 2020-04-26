import { handleActions } from "redux-actions";
import {
  fetchTokenRequest,
  fetchTokenSuccess,
  fetchTokenFailure,
} from "../actions";

const initialState = {
  pending: true,
  error: null,
  data: null,
};

const tokenReducer = handleActions(
  {
    [fetchTokenRequest]: (state, action) => ({
      pending: true,
      error: null,
      data: null,
    }),
    [fetchTokenSuccess]: (state, action) => ({
      pending: false,
      error: null,
      data: action.payload,
    }),
    [fetchTokenFailure]: (state, action) => ({
      pending: false,
      error: action.payload,
      data: null,
    }),
  },
  initialState
);

export default tokenReducer;
