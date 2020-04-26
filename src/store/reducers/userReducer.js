import { handleActions } from "redux-actions";
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from "../actions";

const initialState = {
  pending: true,
  error: null,
  data: null,
};

const userReducer = handleActions(
  {
    [fetchUserRequest]: (state, action) => ({
      pending: true,
      error: null,
      data: null,
    }),

    [fetchUserSuccess]: (state, action) => ({
      pending: false,
      error: null,
      data: action.payload,
    }),
    [fetchUserFailure]: (state, action) => ({
      pending: false,
      error: action.payload,
      data: null,
    }),
  },
  initialState
);

export default userReducer;
