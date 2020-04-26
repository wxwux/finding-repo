import { fork, put, takeLatest, call } from "redux-saga/effects";

import { getParamFromQueryString } from "../../helpers/queries";

import {
  fetchTokenRequest,
  fetchTokenSuccess,
  fetchTokenFailure,
  logoutUser,
} from "../actions";
import { getAccessToken } from "../../services/auth";

const tokenSaga = function* () {
  yield takeLatest(fetchTokenRequest, function* ({ payload: code }) {
    try {
      const result = yield call(getAccessToken, code);
      const token = getParamFromQueryString(result.data, "access_token");
      yield put(fetchTokenSuccess(token));
      localStorage.setItem("token", token);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  });
};

const logout = function* () {
  yield takeLatest(logoutUser, function () {
    try {
      localStorage.removeItem("token");
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  });
};

export default function* () {
  yield fork(tokenSaga);
  yield logout(logout);
}
